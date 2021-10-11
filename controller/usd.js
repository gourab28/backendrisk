const cron = require("node-cron");
const USD_Price = require("../models/usdModel");
const Web3 = require("web3");
const { numberFormat } = require("../utils/token");
const { abi } = require("../utils/abi-pancake");
// web3 config
let bsc = "https://bsc-dataseed.binance.org/";
var web3 = new Web3(new Web3.providers.HttpProvider(bsc));

//RISK PRICE USD CRON EVERY 30 MINUTES
cron.schedule("*/1 * * * *", async function () {
  const contract_address = "0xc33f12e7b16dc2e6e9b61710f9b5b1e5a6653116";
  let contract = new web3.eth.Contract(abi, contract_address);
  let time = new Date();
  const reserves = await contract.methods.getReserves().call();
    let riskReserve = numberFormat(reserves._reserve0, "shannon");
    let riskunit = riskReserve / 100000000000;
    let usdcReserve = numberFormat(reserves._reserve1, "ether");
    let timestamp = reserves._blockTimestampLast;
    let price = usdcReserve / riskunit;
   // console.log(price);
 // const response = await axios.get("https://api.pancakeswap.info/api/v2/tokens/0x0d89a8f99d0a41b3f789af628b3094abf4e846e0");
  let usdp = price;
  console.log(usdp)
  usd_price = new USD_Price({
    usd_price: usdp,
  });
  await usd_price.save();
  console.log("RISK-USD PRICE UPDATE");
});

async function getUsd(req, res) {
    try {
    const usd = await USD_Price.findOne({}).sort({_id : -1}).limit(1);
    let usds = usd.usd_price / 100000000000;
      res.send({
          "price": usd.usd_price,
          "price_2": usds,
          "time": usd.time 
      })  
    } catch (error) {
        res.send(error)
    }
}
async function getUSDGraph (req, res) {
    try {
       // let data =[];
      await USD_Price.find().sort({_id : -1}).limit(8).exec(function(err, graphs){
         return res.send(graphs);
        });
    } catch (error) {
        res.status(400);
        res.send({"error": error})
    }
}

module.exports = {
  getUsd,
  getUSDGraph
};
