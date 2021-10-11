const express = require("express");
const { 
  scanTxn
} = require("../controller/scan");
const scanRoute = express.Router();

scanRoute.route("/tx/:id").get(scanTxn);

module.exports = {  scanRoute }