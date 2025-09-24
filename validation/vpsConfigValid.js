// ram: {
//     type: String,
//     required: true,
//     minLength: 2,
//     maxLength: 20,
//   },
//   gpu: {
//     type: String,
//     required: false,
//     minLength: 2,
//     maxLength: 50,
//   },
//   cpu: {
//     type: String,
//     required: true,
//     minLength: 2,
//     maxLength: 50,
//   },
//   os: {
//     type: [String],
//     required: true,
//     enum: {
//       value: osType,
//       message: "OS must be one of the supported operating systems",
//     },
//     minItems: 1,
//   },
//   storage: {
//     type: String,
//     required: true,
//     minLength: 2,
//     maxLength: 20,
//   },
//   price: {
//     type: Number,
//     required: true,
//     min: 0, // Price cannot be negative
//     max: 20000,

const Joi = require("joi");
const osType = require("../constants/os.type");

//   },
const vpsConfigSchema = Joi.object({
  ram: Joi.string()
    .required()
    .min(2)
    .max(20)
    .pattern(/^[0-9]+(?:GB|MB)$/)
    .message({
      "string.pattern": "RAM must be in format like '4GB' or '1024MB'",
      "any.required": "RAM is required",
    }),
  gpu: Joi.string().min(2).max(50).allow(null, "").message({
    "string.min": "GPU must be at least 2 characters long",
    "string.max": "GPU cannot exceed 50 characters",
  }),
  cpu: Joi.string()
    .required()
    .min(2)
    .max(30)
    .pattern(/^[0-9]+(?:\s*vCPUs)?\s*[A-Za-z0-9\s]+$/)
    .messages({
      "string.pattern": "CPU must be in format like '2 vCPUs' or 'Intel Xeon'",
      "any.required": "CPU is required",
    }),
  os: Joi.array()
    .items(Joi.string().valid(...osType))
    .required()
    .min(1)
    .messages({
      "array.min": "At least one operating system is required",
      "any.required": "Operating systems are required",
      "any.only": "Operating system must be one of the supported types",
    }),
  storage: Joi.string()
    .required()
    .min(2)
    .max(20)
    .pattern(/^[0-9]+(?:GB|MB|TB)\s*(?:SSD|NVMe|HDD)?$/) // e.g., "50GB SSD", "1TB"
    .messages({
      "string.pattern": "Storage must be in format like '50GB SSD' or '1TB'",
      "any.required": "Storage is required",
    }),
  price: Joi.number().required().min(0).max(10000).messages({
    "number.min": "Price cannot be negative",
    "number.max": "Price cannot exceed 10000",
    "any.required": "Price is required",
  }),
});

module.exports = {
  vpsConfigValidate: (body) => 
    vpsConfigSchema.validate(body)
  
};
