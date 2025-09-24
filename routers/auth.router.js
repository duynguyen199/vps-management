const express = require("express");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const { login, register } = require("../controller/auth.controller");
const authRouter = express.Router();

authRouter.post("/login", (req,res,next)=>{console.log("loginABC"); next()}, asyncMiddleware(login))
authRouter.post("/register", (req, res, next) => {
    console.log("Received register request:", req.body);
    next();
}, asyncMiddleware(register));
module.exports = authRouter;