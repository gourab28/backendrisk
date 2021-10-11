const express = require("express");
const { riskSupply } = require("../controller/contract");

// creating a router for the server.
const supplyRouter = express.Router();

// create new User route.
supplyRouter.route("/supply").get(riskSupply);

module.exports = {  supplyRouter }