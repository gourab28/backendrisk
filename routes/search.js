const express = require("express");
const { SearchToken } = require("../controller/search");

// creating a router for the server.
const searchRoute = express.Router();

// create new User route.
searchRoute.route("/search").post(SearchToken);

module.exports = {  searchRoute }