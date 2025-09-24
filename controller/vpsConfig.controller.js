const { PER_PAGE } = require("../constants/common");
const ErrorResponse = require("../helper/ErrorResponse");
const VPSConfigModel = require("../model/VPSConfig.model");
const { vpsConfigValidate } = require("../validation/vpsConfigValid");

module.exports = {
  createVPS: async (req, res) => {
    const { error, value } = vpsConfigValidate(req.body);
    if (error) throw new ErrorResponse(400, "bad request for create vps ");
    const newVps = await VPSConfigModel.create(value);
    return res.status(201).json(newVps);
  },
  getAllVPS: async (req, res) => {
    const {
      ram,
      gpu,
      cpu,
      price,
      sort_ram = 1,
      sort_cpu = 1,
      sort_price = 1,
      page = 1,
      fromPrice,
      toPrice,
    } = req.query;

    const filters = { ram, gpu, cpu, price };
    const bodyQuery = {};

    for (const [key, val] of Object.entries(filters)) {
      if (val) {
        bodyQuery.$or = [{ [key]: { $regex: `.*${val}.*`, $options: "i" } }];
        break; // only one field applied at a time like in your original
      }
    }
    if (fromPrice && toPrice) {
      bodyQuery.$and = [
        {
          price: {
            $gte: Number(fromPrice),
          },
        },
        {
          price: {
            $lte: +toPrice,
          },
        },
      ];
    }

    const newVpsConfig = await VPSConfigModel.find(bodyQuery)
      .sort({ price: +sort_price, ram: +sort_ram, cpu: +sort_cpu })
      .skip(PER_PAGE * page - PER_PAGE)
      .limit(PER_PAGE);
    const count = await VPSConfigModel.countDocuments(bodyQuery);
    return res.status(200).json({
      page: page,
      total_page: Math.ceil(count / PER_PAGE),
      data: newVpsConfig,
    });
  },
  getVpsById: async (req, res) => {
    const { id } = req.params; // Use params.id instead of assuming req.vpsConfig
    const vpsConfig = await VPSConfigModel.findById(id);
    if (!vpsConfig) {
      throw new ErrorResponse(404, "Not found vps");
    }
    return res.status(200).json({
      id: vpsConfig._id,
      ram: vpsConfig.ram,
      gpu: vpsConfig.gpu,
      cpu: vpsConfig.cpu,
      os: vpsConfig.os,
      storage: vpsConfig.storage,
      price: vpsConfig.price,
    });
  },
  updateVPSById: async (req, res) => {
    const id = req.params.id;
    const {error,value} = vpsConfigValidate(req.body)
    if(error){
        throw new ErrorResponse(400,"Bad Request for update vps")
    }
    if (req.vpsConfig && req.vpsConfig._id.toString() !== id) {
        throw new ErrorResponse(403, "Unauthorized to update this VPS configuration");
      }
    const updatedVps = await VPSConfigModel.findByIdAndUpdate(id,value,{new:true})
    return res.json(200).json({
        success:true,
        data:updatedVps
    })
  },
  deleteVpsConfig: async(req,res)=>{
    const id = req.params.id;
    const deletedConfig = await VPSConfigModel.findByIdAndDelete(id);

      if (!deletedConfig) {
        throw new ErrorResponse(404, "VPS configuration not found");
      }

      return res.status(200).json({
        success: true,
        message: "VPS configuration deleted successfully",
      }); 
  }
};
