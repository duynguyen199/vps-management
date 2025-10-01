const express = require("express");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const typeUserRole = require("../constants/type.user.role");
const {
  getAllVPS,
  getVpsById,
  deleteVpsConfig,
  updateVPSById,
  createVPS,
} = require("../controller/vpsConfig.controller");
const vpsConfigRouter = express.Router();

vpsConfigRouter
  .route("/")
  .get(
    asyncMiddleware(authMiddleware),
    roleMiddleware([typeUserRole.ADMIN, typeUserRole.USER]),
    asyncMiddleware(getAllVPS)
  );
vpsConfigRouter
  .route("/createVPSCongig")
  .post(
    asyncMiddleware(authMiddleware),
    roleMiddleware([typeUserRole.ADMIN,typeUserRole.USER]),
    asyncMiddleware(createVPS)
  );

vpsConfigRouter
  .route("/:id")
  .get(
    asyncMiddleware(authMiddleware),
    roleMiddleware([typeUserRole.ADMIN,typeUserRole.USER]),
    asyncMiddleware(getVpsById)
  )
  .delete(
    asyncMiddleware(authMiddleware),
    roleMiddleware([typeUserRole.ADMIN]),
    asyncMiddleware(deleteVpsConfig)
  )
  .put(
    asyncMiddleware(authMiddleware),
    roleMiddleware([typeUserRole.ADMIN]),
    asyncMiddleware(updateVPSById)
  );
module.exports = vpsConfigRouter;
