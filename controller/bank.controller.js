const { PER_PAGE } = require("../constants/common");
const ErrorResponse = require("../helper/ErrorResponse");
const BankModel = require("../model/Bank.model");
const { bankValid } = require("../validation/bankValid");

module.exports = {
  createBank: async (req, res) => {
    const { error, value } = bankValid(req.body);
    if (error) {

      throw new ErrorResponse(400, "Bad request for bank info")
    }
    const newBank = await BankModel.create(value);
    return res.status(201).json(newBank);
  },
  getBankById: async (req, res) => {
    const { id } = req.params;
    const bank = await BankModel.findById(id);
    if (!bank) {
      throw new ErrorResponse(404, "Not found bank");
    }
    return res.status(200).json(bank)
  },
  getAllBanks: async (req, res) => {
    const {
      bankName,
      bankNumber,
      bankOwner,
      page = 1,
      sort_name = 1,
    } = req.query;
    const filters = { bankName, bankNumber, bankOwner };

    const bodyQuery = {};
    for (const [key, val] of Object.entries(filters)) {
      if (val) {
        bodyQuery.$or = [{ [key]: { $regex: `.*${val}.*`, options: "i" } }];
        break;
      }
    }
    const newBank = await BankModel.find(bodyQuery)
      .sort({ bankName: +sort_name })
      .skip(PER_PAGE * page - PER_PAGE)
      .limit(PER_PAGE);
    const counts = await BankModel.countDocuments(bodyQuery);
    return res.status(200).json({
      page,
      total_page: Math.ceil(counts / PER_PAGE),
      data: newBank,
    });
  },
  updateBank: async (req, res) => {
    const { id } = req.params;
    const { error, value } = bankValid(req.body)
    console.log(value,"value")
    if (error) {
      throw new ErrorResponse(400, "Bad request for update bank");
    }
    const updatedBank = await BankModel.findByIdAndUpdate(id, value, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      data: updatedBank,
    });
  },
  deleteBankById: async (req, res) => {
    const { id } = req.params;
    const deletedBank = await BankModel.findByIdAndDelete(id);
    if (!deletedBank) {
      throw new ErrorResponse(404, "VPS  not found");
    }
    return res.status(200).json({
      success: true,
      message: "Bank deleted successfully",
    });
  },
};
