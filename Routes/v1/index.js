const express = require("express");
const authRouter = require("./AuthRoute");

const router = express.Router();

router.use("/auth", authRouter);

module.exports = router;
