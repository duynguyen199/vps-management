const express = require("express");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const typeUserRole = require("../constants/type.user.role");
const {
  createBank,
  getAllBanks,
  getBankById,
  deleteBankById,
  updateBank,
} = require("../controller/bank.controller");
const bankRouter = express.Router();

bankRouter
  .route("/createBank")
  .post(
    asyncMiddleware(authMiddleware),
    roleMiddleware([typeUserRole.ADMIN]),
    asyncMiddleware(createBank)
  );

bankRouter
  .route("/")
  .get(
    asyncMiddleware(authMiddleware),
    roleMiddleware([typeUserRole.ADMIN, typeUserRole.USER]),
    asyncMiddleware(getAllBanks)
  );

bankRouter
  .route("/:id")
  .get(
    asyncMiddleware(authMiddleware),
    roleMiddleware([typeUserRole.ADMIN, typeUserRole.USER]),
    asyncMiddleware(getBankById)
  )
  .delete(
    asyncMiddleware(authMiddleware),
    roleMiddleware([typeUserRole.ADMIN]),
    asyncMiddleware(deleteBankById)
  )
  .put(
    asyncMiddleware(authMiddleware),
    roleMiddleware([typeUserRole.ADMIN]),
    asyncMiddleware(updateBank)
  );


  module.exports = bankRouter