const { default: mongoose } = require("mongoose");
const osType = require("../constants/os.type");

const vpsConfigSchema = new mongoose.Schema(
  {
    ram: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
    },
    gpu: {
      type: String,
      required: false,
      minLength: 2,
      maxLength: 50,
    },
    cpu: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    os: {
      type: [String],
      required: true,
      enum: osType, // ✅ correct usage
      validate: {
        validator: (val) => Array.isArray(val) && val.length > 0,
        message: "At least one OS must be selected",
      },
    },
    storage: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Price cannot be negative
      max: 20000,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports =  mongoose.model("VPSConfig",vpsConfigSchema)