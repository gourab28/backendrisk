const express = require("express");
const auth = require('../middlewares/auth');
const { 
  signIn ,
  logOut ,
  newAma,
  getAmaS,
  deleteAMA,
  publicAMA,
  deleteAllAMA,
  newMember,
  getMembers,
  deleteMember
} = require("../controller/ams");

// creating a router for the server.
const AccountRoute = express.Router();

// create new User route.
AccountRoute.route("/admin/login").post(signIn);
AccountRoute.route("/admin/logout").post(auth.enhance, logOut);
AccountRoute.route("/admin/ama").post(auth.enhance, newAma);
AccountRoute.route("/admin/ama").get(auth.enhance, getAmaS);
AccountRoute.route("/admin/ama/delete/:id").delete(auth.enhance, deleteAMA);
AccountRoute.route("/ama").get(publicAMA);
AccountRoute.route("/admin/ama/delete/all").delete(auth.enhance, deleteAllAMA);
AccountRoute.route("/admin/members/add").post(auth.enhance, newMember);
AccountRoute.route("/admin/members/delete/:id"). delete(auth.enhance, deleteMember);
AccountRoute.route("/team").get(getMembers);


module.exports = {  AccountRoute }