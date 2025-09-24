const Joi = require('joi');

//   {
//     full_name: {
//       type: String,
//       required: true,
//       minLength: 3,
//       maxLength: 50,
//     },
//     username: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: Object.values(typeUserRole),
//       default: typeUserRole.ADMIN,
//     },
//     balance: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   }
// );
const registerUserSchema = Joi.object({
    full_name:Joi.string().min(5).max(50).required(),
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(new RegExp(/^[a-zA-Z0-9@$!%*.?&]{6,16}$/))
    .required(),
  balance:Joi.number().min(0).required()
});

module.exports = {
  registerUserValid: (body) => registerUserSchema.validate(body),
};
