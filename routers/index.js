const authRouter = require("./auth.router")
const userRouter = require("./user.router")
const vpsConfigRouter = require("./vpsConfig.router")

module.exports = (app)=>{
    app.use("/api/auth",authRouter)
    app.use("/api/user",userRouter)
    app.use("/api/vpsConfig",vpsConfigRouter)
}