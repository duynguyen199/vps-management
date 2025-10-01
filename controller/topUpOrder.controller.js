const { default: mongoose } = require("mongoose");
const ErrorResponse = require("../helper/ErrorResponse");
const BankModel = require("../model/Bank.model");
const TopUpOrder = require("../model/TopUpOrder");
const UserModel = require("../model/User.model");
const { PER_PAGE } = require("../constants/common");

module.exports = {
  createTopUpOrder: async (req, res) => {
    const { userId, bankId, amount } = req.body;
    if (!userId || !bankId || !amount || amount <= 0) {
      throw new ErrorResponse(
        400,
        "Missing or invalid fields: userId, bankId, amount"
      );
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      throw new ErrorResponse(404, "User Not found");
    }
    const bank = await BankModel.findById(bankId);

    if (!bank || bank.status !== "active") {
      throw new ErrorResponse(404, "Bank Not found");
    }
    const topUpOrder = await TopUpOrder.create({
      userId,
      bankId,
      amount,
    });
    res.status(201).json(topUpOrder);
  },
  getProccessedOfOrder: async (req, res) => {
    const { userId } = req.params;
    const { sort_created = 1, page = 1 } = req.query;
    console.log(userId);
    if (!userId) {
      throw new ErrorResponse(400, "Invalid user ID");
    }
    const topUpOrder = await TopUpOrder.find({ userId })
      .populate("bankId")
      .sort({ createdAt: +sort_created })
      .skip(PER_PAGE * page - PER_PAGE)
      .limit(PER_PAGE);
    const counts = await TopUpOrder.countDocuments({ userId });
    return res.status(200).json({
      page: page,
      total_page: Math.ceil(counts / PER_PAGE),
      data: topUpOrder,
    });
  },
  processTopUpOrder: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["SUCCESS", "FAILED"].includes(status)) {
      throw new ErrorResponse(
        400,
        "Invalid status: must be 'success' or 'failed'"
      );
    }
    if (!id) {
      throw new ErrorResponse(400, "Invalid top-up order ID");
    }
    const topUpOrder = await TopUpOrder.findById(id).populate("userId");
    topUpOrder.status = status;
    if (status === "success") {
      const user = topUpOrder.userId;
      user.balance = (user.balance || 0) + topUpOrder.amount;
      await user.save();
    }
    await topUpOrder.save();

    res.status(200).json(topUpOrder);
  },
};
