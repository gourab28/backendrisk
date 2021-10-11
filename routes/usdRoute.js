const express = require("express");
const { getUsd, getUSDGraph} = require("../controller/usd");

// creating a router for the server.
const usdRoute = express.Router();

// create new User route.
usdRoute.route("/usd").get(getUsd);
usdRoute.route("/usd/graph").get(getUSDGraph)

module.exports = {  usdRoute }