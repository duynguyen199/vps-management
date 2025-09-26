const { default: mongoose } = require("mongoose");
const vpsStatus = require("../constants/vps.status");

const vpsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
      trim: true,
    },
    os: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(vpsStatus),
      default: vpsStatus.INACTIVE,
    },
    vpsConfigId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "VPSConfig",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("vps", vpsSchema)