const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const tokenRouter = express.Router();

tokenRouter.get("/tokentrack", function (req, res) {
  //
  const url =
    "https://bscscan.com/token/0x0d89a8f99d0a41b3f789af628b3094abf4e846e0";
  axios({
    url,
    timeout: 10000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "GET",
    },
  }).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const bnbscan = $("#ContentPlaceHolder1_tr_tokenHolders");
    //console.log(statsTable.length);
    const bnb = [];

    function removeLinebreak(str) {
      return str.replace(/[\r\n]+/gm, " ");
    }
    bnbscan.each(function () {
      const tokenHolder = $(this)
        .find("div > div.col-md-8 > div > div")
        .text()
        .replace(/(\r\n|\n|\r)/gm, "");
    let currentdate = new Date(); 
      bnb.push({
        holders: tokenHolder,
        time : currentdate
      });
    });
    res.status(200).json(bnb);
  });
});

module.exports = { tokenRouter };
