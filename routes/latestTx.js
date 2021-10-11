const express = require("express");
const { getLastTx } = require("../controller/lasttx");

// creating a router for the server.
const txRoute = express.Router();

// create new User route.
txRoute.route("/last-10tx").get(getLastTx);

module.exports = {  txRoute }