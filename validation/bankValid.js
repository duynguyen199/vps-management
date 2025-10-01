// bankName: {
//     type: String,
//     required: true,
//   },
//   bank_number: {
//     type: String,
//     required: true,
//     minLength: 8,
//     maxLength: 20,
//     trim: true,
//     unique: true,
//   },
//   bank_owner: {
//     type: String,
//     required: true,
//     minLength: 2,
//     maxLength: 100,
//     trim: true,
//   },
//   status: {
//     type: String,
//     required: true,
//     enum: Object.values(bankStatus),
//     default: bankStatus.ACTIVE,
//   },
// },
const Joi = require("joi")
const bankValidSchema = Joi.object({
    bankName:Joi.string().min(5).max(20).required(),
    bank_number: Joi.string().min(8).max(20).required(),
    bank_owner: Joi.string().min(2).max(30).required(),
})

module.exports={
    bankValid:(body)=> bankValidSchema.validate(body)
}