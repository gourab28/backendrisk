const Web3 = require("web3");
const { abi } = require("../utils/abi");
const axios = require("axios");
const cheerio = require("cheerio");
const bsc = "https://bsc-dataseed.binance.org/";
let web3 = new Web3(new Web3.providers.HttpProvider(bsc));

async function SearchToken(req, res) {
  const { token } = req.body;
  const bnb = [];
  const url = `https://bscscan.com/token/${token}`;
 await axios({
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
    function removeLinebreak(str) {
      return str.replace(/[\r\n]+/gm, " ");
    }
    bnbscan.each(function () {
      const tokenHolder = $("#ContentPlaceHolder1_tr_tokenHolders > div > div.col-md-8 > div > div").text().replace(/(\r\n|\n|\r)/gm, "");
      const tokenUSD = $("#ContentPlaceHolder1_tr_valuepertoken > div > div:nth-child(1) > span > span:nth-child(1)").text();
      const tokenBNB = $("#ContentPlaceHolder1_tr_valuepertoken > div > div:nth-child(1) > span > span.small.text-secondary.text-nowrap").text().replace("@","");
      const tnx = $("#totaltxns").text();

      bnb.push({
        holders: tokenHolder,
        totaltnxs: tnx,
        usdprice: tokenUSD,
        bnbprice: tokenBNB,
      });
    });
  });
  try {
    const contract = new web3.eth.Contract(abi, token);
    const name = await contract.methods.name().call();
    const symbol = await contract.methods.symbol().call();
    res.status(200);
    res.send({
      "contract": token,
      "name": name,
      "symbol": symbol,
      "info": bnb
    });
  } catch (error) {
    res.status(400);
    res.send({ error: "technical error" });
  }
}
module.exports = { SearchToken };
