const { default: mongoose } = require("mongoose");
const typeUserRole = require("../constants/type.user.role");
const bcryptjs = require("bcryptjs");
// full_name: Tên người dùng.
// username: Email.
// password: Mật khẩu (hash).
// role: Phân quyền (user, admin).
// balance: Số dư tài khoản (mặc định là 0).
// createdAt, updatedAt.
const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(typeUserRole),
      default: typeUserRole.USER,
    },
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
userSchema.set("toJSON", {
  transform: (doc, ret, option) => {
    delete ret.password;
  },
});
userSchema.pre("save", function (next) {
  const user = this;
  if (user.password) {
    user.password = bcryptjs.hashSync(user.password, 10);
  }
  next();
});
userSchema.pre("findOneAndUpdate", function (next) {
  const user = { ...this.getUpdate() };
  if (user.password) {
    user.password = bcryptjs.hashSync(user.password, 10);
  }
  this.setUpdate(user);

  next();
});

userSchema.pre("findByIdAndUpdate", function (next) {
  const user = { ...this.getUpdate() };
  if (user.password) {
    user.password = bcryptjs.hashSync(user.password, 10);
  }
  this.setUpdate(user);

  next();
});

module.exports = mongoose.model("user", userSchema);
