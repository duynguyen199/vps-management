const authRouter = require("./auth.router")
const userRouter = require("./user.router")

module.exports = (app)=>{
    app.use("api/auth",authRouter)
    app.user("api/user",userRouter)
}