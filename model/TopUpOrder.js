const { default: mongoose } = require("mongoose");
const vpsStatus = require("../constants/vps.status");
const topOrderStatus = require("../constants/topOrderStatus");

const topUpOrderShema = new mongoose.Schema({
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"user",
        required:true
    },
    bankId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"bank",
        required:true
    },
    amount:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:Object.values(topOrderStatus),
        default:topOrderStatus.PENDING
    }
},  {
    timestamps: true,
    versionKey: false,
  })
  topUpOrderShema.pre("save",function(next){
    this.updatedAt = Date.now();
    next();
  });

  module.exports = mongoose.model("topUpOrder", topUpOrderShema)