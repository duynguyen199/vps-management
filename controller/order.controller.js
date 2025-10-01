const vpsStatus = require("../constants/vps.status");
const ErrorResponse = require("../helper/ErrorResponse");
const OrderModel = require("../model/Order.model");
const UserModel = require("../model/User.model");
const VPSConfigModel = require("../model/VPSConfig.model");
const VpsModel = require("../model/Vps.model");
const cron = require("node-cron");

module.exports = {
  createOrder: async (req, res) => {
    const { userId, vpsId, durationMinutes } = req.body;
    const user = await UserModel.findById(userId);
    if (!userId) {
      throw new ErrorResponse(404, "Not found user");
    }
    const vps = await VpsModel.findById(vpsId).populate("vpsConfigId");
    if (!vps) {
      throw new ErrorResponse(404, "Not Found vps");
    }


    const costPerMinutes = vps.vpsConfigId.price / 60;
    const totalCost = costPerMinutes * durationMinutes;

    if (user.balance < totalCost) {
      throw new ErrorResponse(400, "Insufficient balance");
    }

    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
    const order = await OrderModel.create({
      userId,
      vpsId:vps._id,
      startDate,
      endDate
    })
    user.balance -= totalCost;
    await user.save();
    vps.status = vpsStatus.ACTIVE;
    await vps.save();
    res.status(201).json(order);
  },
  getOrderStatus: async (req, res) => {
    const { orderId } = req.params;
    const order = await OrderModel.findById(orderId)
      .populate("userId")
      .populate({ path: "vpsId", populate: { path: "vpsConfigId" } });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  },

  manualRunCron: async (req, res) => {
    const now = Date.now();
    const expiredOrders = await OrderModel.find({
      status: "success",
      endDate: { $lte: now },
    });
    for (const order of expiredOrders) {
      order.status = "completed";
      await order.save();
    }
    const vps = await VpsModel.findById(order.vpsId);
    if (vps) {
      vps.status = "INACTIVE";
      await vps.save();
    }
    res.status(200).json({
      message: "Cron job executed manually",
      processedOrders: expiredOrders.length,
    });
  },
};
