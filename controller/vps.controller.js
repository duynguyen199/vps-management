const { default: mongoose } = require("mongoose");
const { PER_PAGE } = require("../constants/common");
const { sort } = require("../constants/os.type");
const ErrorResponse = require("../helper/ErrorResponse");
const VpsModel = require("../model/Vps.model");
const vpsConfigValid = require("../validation/vpsConfigValid");
const { vpsValidate } = require("../validation/vpsValid");

module.exports = {
  createVps: async (req, res) => {
    const { error, value } = vpsValidate(req.body);
    if (error) {
      throw new ErrorResponse(400, "Bad Reqest create vps");
    }
    const newVps = await VpsModel.create(value);
    return res.status(201).json(newVps);
  },


  getAllVps: async (req, res) => {
    const { name, os, status, page = 1, sort_name = 1 } = req.query;
    const filters = { name, os, status };
    const bodyQuery = {};

    for (const [key, val] of Object.entries(filters)) {
      if (val) {
        bodyQuery.$or = [{ [key]: { $regex: `.*${val}.*`, $options: "i" } }];
        break;
      }
    }

    const newVps = await VpsModel.find(bodyQuery)
      .populate("vpsConfigId")
      .sort({ name: +sort_name })
      .skip(PER_PAGE * page - PER_PAGE)
      .limit(PER_PAGE);
    const count = await VpsModel.countDocuments(bodyQuery);
    return res.status(200).json({
      page: page,
      total_page: Math.ceil(count / PER_PAGE),
      data: newVps,
    });
  },
  getVpsByConfigId: async (req, res) => {
    const{vpsConfigId} = req.params
    const {sort_name = 1, page } = req.query;
    const vpList = await VpsModel.find({vpsConfigId})
      .populate("vpsConfigId")
      .sort({ name: +sort_name })
      .skip(PER_PAGE * page - PER_PAGE)
      .limit(PER_PAGE);
      console.log(vpList)
    const countVp = await VpsModel.countDocuments(vpsConfigId);
    return res.status(200).json({
      page: page,
      total_page: Math.ceil(countVp / PER_PAGE),
      data: vpList,
    });
  },

  getVpsById: async (req, res) => {
    const { id } = req.params;
    const vps = await VpsModel.findById(id);
    if (!vps) {
      throw new ErrorResponse(404, "Not foundvps");
    }
    return res.status(200).json(vps)

  },
  // data trả về null
  updateVpsById: async (req, res) => {
    const { id } = req.params;
    const { error, value } = vpsValidate(req.body);
    if (error) {
      throw new ErrorResponse(400, "Bad request for update vps");
    }

    const updateVps = await VpsModel.findByIdAndUpdate(id, value, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      data: updateVps,
    });
  },
  deleteaVpsById: async (req, res) => {
    const { id } = req.params;
    const deleteVps = await VpsModel.findByIdAndDelete(id);
    if (!deleteVps) {
      throw new ErrorResponse(404, "VPS  not found");
    }
    return res.status(200).json({
      success: true,
      message: "VPS deleted successfully",
    });
  },
};
