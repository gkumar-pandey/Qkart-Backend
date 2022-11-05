const express = require("express");
const authRouter = express.Router();
const {
  loginHandler,
  signupHandler,
} = require("../../Controllers/AuthController");

authRouter.post("/login", loginHandler);
authRouter.post("/signup", signupHandler);

module.exports = authRouter;
