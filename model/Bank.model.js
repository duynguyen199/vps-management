const { default: mongoose } = require("mongoose");
const bankStatus = require("../constants/bank.status");

const bankSchema = new mongoose.Schema(
  {
    bankName: {
      type: String,
      required: true,
    },
    bank_number: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 20,
      trim: true,
      unique: true,
    },
    bank_owner: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 100,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(bankStatus),
      default: bankStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
bankSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
  
  module.exports = mongoose.model('bank', bankSchema);