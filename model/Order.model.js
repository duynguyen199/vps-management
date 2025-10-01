const { default: mongoose } = require("mongoose");
const orderStatus = require("../constants/order.status");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
    vpsId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "vps",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(orderStatus),
      default: orderStatus.PENDING,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("order", orderSchema);
orderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});
