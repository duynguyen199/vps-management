const Joi = require("joi");
const vpsStatus = require("../constants/vps.status");
const { default: mongoose } = require("mongoose");

const vpsSchema = Joi.object({
  name: Joi.string().required().min(2).max(20).trim(),
  os: Joi.string().required().min(2).max(20),
  status: Joi.string()
    .valid(...Object.values(vpsStatus)),
  vpsConfigId: Joi.string().required()
    .pattern(/^[0-9a-fA-F]{24}$/), // Validates MongoDB ObjectId
}).options({ abortEarly: false });

module.exports = {
    vpsValidate: (body) => 
      vpsSchema.validate(body)
    
  };
  