const express = require("express")
const asyncMiddleware = require("../middleware/asyncMiddleware")
const authMiddleware = require("../middleware/auth.middleware")
const roleMiddleware = require("../middleware/role.middleware")
const typeUserRole = require("../constants/type.user.role")
const { createOrder, getOrderStatus, manualRunCron } = require("../controller/order.controller")
const orderRouter = express.Router()



orderRouter
.route("/createOrder")
.post(asyncMiddleware(authMiddleware),
roleMiddleware([typeUserRole.USER,typeUserRole.ADMIN]),
asyncMiddleware(createOrder))

orderRouter
.route("/:id")
.get(asyncMiddleware(authMiddleware),
roleMiddleware([typeUserRole.USER,typeUserRole.ADMIN]),
asyncMiddleware(getOrderStatus))
orderRouter.post('/cron', manualRunCron);

module.exports= orderRouter
