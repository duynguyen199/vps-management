const express = require("express");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const typeUserRole = require("../constants/type.user.role");
const {
  createTopUpOrder,
  getProccessedOfOrder,
  processTopUpOrder,
} = require("../controller/topUpOrder.controller");
const topUpOrderRouter = express.Router();

topUpOrderRouter
  .route("/createTopUpOrder")
  .post(
    asyncMiddleware(authMiddleware),
    roleMiddleware([typeUserRole.ADMIN, typeUserRole.USER]),
    asyncMiddleware(createTopUpOrder)
  );
topUpOrderRouter
  .route("/:userId")
  .get(
    asyncMiddleware(authMiddleware),
    roleMiddleware([typeUserRole.ADMIN]),
    asyncMiddleware(getProccessedOfOrder)
  );

topUpOrderRouter
  .route("/:id")
  .put(
    asyncMiddleware(authMiddleware),
    roleMiddleware([typeUserRole.ADMIN]),
    asyncMiddleware(processTopUpOrder)
  );
module.exports = topUpOrderRouter