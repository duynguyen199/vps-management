const authRouter = require("./auth.router")
const bankRouter = require("./bank.router")
const orderRouter = require("./order.router")
const topUpOrderRouter = require("./topUpOrder.router")
const userRouter = require("./user.router")
const vpsRouter = require("./vps.router")
const vpsConfigRouter = require("./vpsConfig.router")

module.exports = (app)=>{
    app.use("/api/auth",authRouter)
    app.use("/api/user",userRouter)
    app.use("/api/vpsConfig",vpsConfigRouter)
    app.use("/api/vps",vpsRouter)
    app.use("/api/order",orderRouter)
    app.use("/api/bank",bankRouter)
    app.use("/api/topUp-order",topUpOrderRouter)
}