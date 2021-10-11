const Web3 = require("web3");
const cron = require("node-cron");
const { riskFormat } = require("../utils/riskFormatter");
const { abi } = require("../utils/abi");
const SupplyDB = require("../models/supplyModel");

// web3 config
let bsc = "https://bsc-dataseed.binance.org/";
var web3 = new Web3(new Web3.providers.HttpProvider(bsc));
const contract_address = "0x0d89a8f99d0a41b3f789af628b3094abf4e846e0";
let contract = new web3.eth.Contract(abi, contract_address);

cron.schedule("0 0 * * *", async () => {
  // Total Supply
  const supply = await contract.methods.totalSupply().call();
  // Total Marketing
  const marketing = await contract.methods.totalMarketing().call();
  // Total Fees
  const totalfees = await contract.methods.totalFees().call();
  // Total Burn
  const totalBurn = await contract.methods.totalBurn().call();
  supplys = new SupplyDB({
    totalSupply: supply,
    totalMarketing: marketing,
    totalFees: totalfees,
    totalBurn: totalBurn,
  });
  await supplys.save();
  console.log("Save to database")
});

async function riskSupply(req, res) {
  // Total Supply
  const supply = await contract.methods.totalSupply().call();
  // Total Marketing
  const marketing = await contract.methods.totalMarketing().call();
  // Total Fees
  const totalfees = await contract.methods.totalFees().call();
  // Total Burn
  const totalBurn = await contract.methods.totalBurn().call();
  let response = [
    {
      name: "Total $RISK Supply",
      value: riskFormat(supply),
      tag: "totalSupply",
    },
    {
      name: "Total $RISK Marketing",
      value: riskFormat(marketing),
      tag: "totalMarketing",
    },
    {
      name: "Total $RISK Reflection",
      value: riskFormat(totalfees),
      tag: "totalFees",
    },
    {
      name: "Total $RISK Burn",
      value: riskFormat(totalBurn),
      tag: "totalBurn",
    },
  ];
  try {
    res.status(200);
    res.send(response);
  } catch (error) {
    res.status(400);
    res.send({ error: error });
  }
}
module.exports = {
  riskSupply,
};
