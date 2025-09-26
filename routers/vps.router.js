const express = require("express");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const authMiddleware = require("../middleware/auth.middleware");
const typeUserRole = require("../constants/type.user.role");
const { getAllVPS, getVpsById } = require("../controller/vpsConfig.controller");
const roleMiddleware = require("../middleware/role.middleware");
const { createVps, getVpsByConfigId, updateVpsById } = require("../controller/vps.controller");
const vpsRouter = express.Router();

vpsRouter
  .route("/")
  .get(
    asyncMiddleware(authMiddleware),
    roleMiddleware([typeUserRole.ADMIN, typeUserRole.USER]),
    asyncMiddleware(getAllVPS)
  );

vpsRouter
  .route("/createVps")
  .post(
    asyncMiddleware(authMiddleware),
    roleMiddleware([typeUserRole.ADMIN]),
    asyncMiddleware(createVps)
  );
vpsRouter
  .route("/by-config")
  .get(
    asyncMiddleware(authMiddleware),
    roleMiddleware([typeUserRole.ADMIN, typeUserRole.USER]),
    asyncMiddleware(getVpsByConfigId)
  );
vpsRouter
  .route("/:id")
  .get(
    asyncMiddleware(authMiddleware),
    roleMiddleware([typeUserRole.ADMIN, typeUserRole.USER]),
    asyncMiddleware(getVpsById)
  )
  .delete(
    asyncMiddleware(authMiddleware),
    roleMiddleware([typeUserRole.ADMIN]),
    asyncMiddleware(getVpsById)
  )
  .put(
    asyncMiddleware(authMiddleware),
    roleMiddleware([typeUserRole.ADMIN]),
    asyncMiddleware(updateVpsById)
  );
  module.exports = vpsRouter
