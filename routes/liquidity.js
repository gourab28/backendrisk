const express = require("express");
const { RISKETH , RISKUSDC, RISKBTCB , RISKBNB , RISKUSDT, RISKBUSD , RISKCAKE} = require("../controller/liquidity");

// creating a router for the server.
const liquidityRouter = express.Router();

// create new User route.
liquidityRouter.route("/risketh").get(RISKETH);
liquidityRouter.route("/riskusdc").get(RISKUSDC);
liquidityRouter.route("/riskbtcb").get(RISKBTCB);
liquidityRouter.route("/riskbnb").get(RISKBNB);
liquidityRouter.route("/riskusdt").get(RISKUSDT);
liquidityRouter.route("/riskcake").get(RISKCAKE);
//liquidityRouter.route("/riskdoge").get(RISKDOGE);

module.exports = {  liquidityRouter }