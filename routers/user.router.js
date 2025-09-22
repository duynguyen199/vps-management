const express = require("express");
const roleMiddleware = require("../middleware/role.middleware");
const typeUserRole = require("../constants/type.user.role");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const { getAllUsers, getUserById, updateUserById } = require("../controller/user.controller");
const { use } = require("react");
const authMiddleware = require("../middleware/auth.middleware");
const userRouter= express.Router();

userRouter.route("/").get(asyncMiddleware(authMiddleware),roleMiddleware([typeUserRole.USER]),asyncMiddleware(getAllUsers) )
userRouter.route("/:id").get(asyncMiddleware(authMiddleware), roleMiddleware([typeUserRole.USER]),asyncMiddleware(getUserById) )
userRouter.route("/:id").put(asyncMiddleware(authMiddleware), roleMiddleware([typeUserRole.ADMIN]),asyncMiddleware(updateUserById) )
module.exports = userRouter;