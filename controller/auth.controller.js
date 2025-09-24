const ErrorResponse = require("../helper/ErrorResponse");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/User.model");
const { SECRETKEY } = require("../configs/configuration");
const { registerUserValid } = require("../validation/registerUserValid");
console.log("Imported registerUserValid:", registerUserValid);
module.exports = {
  login: async (req, res, next) => {
    const { username, password } = req.body; // Fixed typo     
    const user = await UserModel.findOne({ username });

    if (!user) {
      throw new ErrorResponse(401, "Wrong username or password");
    }
    const checkPassword = bcryptjs.compareSync(password, user.password);
    if (!checkPassword) {
      throw new ErrorResponse(401, "Wrong username or password");
    }

    const payload = {
      _id: user._id,
      username: user.username,
      role: user.role,
    };
    const token = jwt.sign(payload, SECRETKEY, { expiresIn: "1d" });

    return res.status(200).json({ ...payload, jwt: token });
  },
  register: async (req, res, next) => {
    const body = req.body;

    const { error, value } =  registerUserValid(body);
    if (error) throw new ErrorResponse(400, error.details[0].message);
    const newUser = await UserModel.create(value);
    return res.status(201).json(newUser);
  },
};
