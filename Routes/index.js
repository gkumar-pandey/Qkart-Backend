const express = require("express");
const router = require("./v1");

const indexRouter = express.Router();

indexRouter.use("/v1", router);

module.exports = indexRouter;
