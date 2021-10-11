const Web3 = require("web3");
const { numberFormat } = require("../utils/token");
const axios = require("axios");
const { abi } = require("../utils/abi-pancake");
// web3 config
let bsc = "https://bsc-dataseed.binance.org/";
var web3 = new Web3(new Web3.providers.HttpProvider(bsc));

async function RISKETH(req, res) {
  const response = await axios.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=USD");
  const contract_risketh = "0x9097344778D137f4707B099F5E7D1A8601C85FE7";
  let contract = new web3.eth.Contract(abi, contract_risketh);
  let time = new Date();
  try {
    const reserves = await contract.methods.getReserves().call();
    let riskReserve = numberFormat(reserves._reserve0, "shannon");
    let riskunit = riskReserve / 100000000000;
    let reserve1 = numberFormat(reserves._reserve1, "ether");
    let timestamp = reserves._blockTimestampLast;
    let price = reserve1 / riskunit;
    let price0 = reserve1 * response.data.ETH.USD;
    let price1 = reserve1 * response.data.ETH.USD;
    let result = price0 + price1;
    // console.log("100B RISK/ETH:",price); //Price In Ethereum. Per 100 Billion $RISK
    res.status(200);
    res.send({
      LP: "RISK / ETH",
      RISKETH: result,
      LOCKED: {
       "name":"TOTAL TOKENS LOCKED",
       "RISK": riskReserve,
       "ETH": reserve1
      },
      lastupdate: time,
    });
  } catch (e) {
    res.status(400);
    res.send(e);
  }
}
async function RISKBNB(req, res) {
  const response = await axios.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BNB&tsyms=USD");
  const contract_riskbnb = "0x73A0671a9A394F33f300BB2c69b86063C7F88333";
  let contract = new web3.eth.Contract(abi, contract_riskbnb);
  let time = new Date();
  try {
    const reserves = await contract.methods.getReserves().call();
    let riskReserve = numberFormat(reserves._reserve0, "shannon");
    let riskunit = riskReserve / 100000000000;
    let reserve1 = numberFormat(reserves._reserve1, "ether");
    let timestamp = reserves._blockTimestampLast;
    let price = reserve1 / riskunit;
    let price0 = reserve1 * response.data.BNB.USD;
    let price1 = reserve1 * response.data.BNB.USD
    let result = price0 + price1;
    // console.log("100B RISK/ETH:",price); //Price In Ethereum. Per 100 Billion $RISK
    res.status(200);
    res.send({
      LP: "RISK / BNB",
      RISKBNB: result,
      LOCKED: {
       "name":"TOTAL TOKENS LOCKED",
       "RISK": riskReserve,
       "BNB": reserve1
      },
      lastupdate: time,
    });
  } catch (e) {
    res.status(400);
    res.send(e);
  }
}
async function RISKUSDC(req, res) {
  const contract_address = "0xc33f12e7b16dc2e6e9b61710f9b5b1e5a6653116";
  let contract = new web3.eth.Contract(abi, contract_address);
  let time = new Date();
  try {
    const reserves = await contract.methods.getReserves().call();
    let riskReserve = numberFormat(reserves._reserve0, "shannon");
    let lockusd =  numberFormat(reserves._reserve0, "shannon");
    let lockrisk = numberFormat(reserves._reserve0, "shannon");
    let riskunit = riskReserve / lockusd;
    let lockunit = riskReserve / lockrisk
    let usdcReserve = numberFormat(reserves._reserve1, "ether");
    let timestamp = reserves._blockTimestampLast;
    let price0 = usdcReserve / riskunit;
    let price1 = usdcReserve / lockunit;
    let result = price0 + price1;
    console.log(result)
    // console.log("100B RISK/USDC:",price); //Price In USDC. Per 100 Billion $RISK
    res.status(200);
    res.send({
      LP: "RISK / USDC",
      RISKUSDC: result,
      LOCKED: {
        "name":"TOTAL TOKENS LOCKED",
        "RISK": riskReserve,
        "USDC": usdcReserve
       },
       lastupdate: time,
    });
  } catch (e) {
    res.status(400);
    res.send(e);
  }
}
async function RISKBTCB(req, res) {
  const response = await axios.get(
    "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD",
  );
  const contract_address = "0x349270EA694A3E11cdCcaD8244abcedA68a5f5c3";
  let contract = new web3.eth.Contract(abi, contract_address);
  let time = new Date();
  try {
    const reserves = await contract.methods.getReserves().call();
    let riskReserve = numberFormat(reserves._reserve0, "shannon");
    let riskunit = riskReserve / 100000000000;
    let btcReserve = numberFormat(reserves._reserve1, "ether");
    let timestamp = reserves._blockTimestampLast;
    let price = btcReserve / riskunit;
    let usdprice = price * response.data.BTC.USD;
    let price0 = btcReserve * response.data.BTC.USD;
    let price1 = btcReserve * response.data.BTC.USD;
    let result = price0 + price1;
    // console.log("100B RISK/BTC:",price); //BTCB Price
    res.status(200);
    res.send({
      LP: "RISK / BTCB",
      RISKBTCB: result,
      LOCKED: {
       "name":"TOTAL TOKENS LOCKED",
       "RISK": riskReserve,
       "BTCB": btcReserve
      },
      lastupdate: time,
    });
  } catch (e) {
    res.status(400);
    res.send(e);
  }
}

async function RISKUSDT (req, res) {
  const contract_address = "0x0d5cacf0d2881a362e3769fd969306cd7767ceb2";
  let contract = new web3.eth.Contract(abi, contract_address);
  let time = new Date();
  try {
    const reserves = await contract.methods.getReserves().call();
    let riskReserve = numberFormat(reserves._reserve0, "shannon");
    let lockusd =  numberFormat(reserves._reserve0, "shannon");
    let lockrisk = numberFormat(reserves._reserve0, "shannon");
    let riskunit = riskReserve / lockusd;
    let lockunit = riskReserve / lockrisk
    let usdtReserve = numberFormat(reserves._reserve1, "ether");
    let timestamp = reserves._blockTimestampLast;
    let price0 = usdtReserve / riskunit;
    let price1 = usdtReserve / lockunit;
    let result = price0 + price1;
    // console.log("100B RISK/USDC:",price); //Price In USDC. Per 100 Billion $RISK
    res.status(200);
    res.send({
      LP: "RISK / USDC",
      RISKUSDC: result,
      LOCKED: {
       "name":"TOTAL TOKENS LOCKED",
       "RISK": riskReserve,
       "USDT": usdtReserve
      },
      lastupdate: time,
    });
  } catch (e) {
    res.status(400);
    res.send(e);
  }
}
async function RISKBUSD (req, res) {
  const contract_address = "0xf4b2d867568d42cc796ef70a16fa7c9dadc0e4d1";
  let contract = new web3.eth.Contract(abi, contract_address);
  let time = new Date();
  try {
    const reserves = await contract.methods.getReserves().call();
    let riskReserve = numberFormat(reserves._reserve0, "shannon");
    let lockusd =  numberFormat(reserves._reserve0, "shannon");
    let lockrisk = numberFormat(reserves._reserve0, "shannon");
    let riskunit = riskReserve / lockusd;
    let lockunit = riskReserve / lockrisk
    let busdReserve = numberFormat(reserves._reserve1, "ether");
    let timestamp = reserves._blockTimestampLast;
    let price0 = busdReserve / riskunit;
    let price1 = busdReserve / lockunit;
    let result = price0 + price1;
    // console.log("100B RISK/USDC:",price); //Price In USDC. Per 100 Billion $RISK
    res.status(200);
    res.send({
      LP: "RISK / BUSD",
      RISKBUSD: result,
      LOCKED: {
       "name":"TOTAL TOKENS LOCKED",
       "RISK": riskReserve,
       "BUSD": reserve1
      },
      lastupdate: time,
    });
  } catch (e) {
    res.status(400);
    res.send(e);
  }
}
async function RISKCAKE (req, res) {
  const response = await axios.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=CAKE&tsyms=USD");
  const contract_riskcake = "0xb6c1dac36e8f110983cd7b88b2a7f7b44adc983d";
  let contract = new web3.eth.Contract(abi, contract_riskcake);
  let time = new Date();
  try {
    const reserves = await contract.methods.getReserves().call();
    let riskReserve = numberFormat(reserves._reserve0, "shannon");
    let riskunit = riskReserve / 100000000000;
    let reserve1 = numberFormat(reserves._reserve1, "ether");
    let timestamp = reserves._blockTimestampLast;
    let price = reserve1 / riskunit;
    let price0 = reserve1 * response.data.CAKE.USD;
    let price1 = reserve1 * response.data.CAKE.USD;
    let result = price0 + price1;
    // console.log("100B RISK/ETH:",price); //Price In Ethereum. Per 100 Billion $RISK
    res.status(200);
    res.send({
      LP: "RISK / CAKE",
      RISKCAKE: result,
      LOCKED: {
       "name":"TOTAL TOKENS LOCKED",
       "RISK": riskReserve,
       "CAKE": reserve1
      },
      lastupdate: time,
    });
  } catch (e) {
    res.status(400);
    res.send(e);
  }
}

module.exports = { RISKETH, RISKUSDC, RISKBTCB,RISKBNB , RISKUSDT , RISKBUSD , RISKCAKE };

/**
 *   const response = await axios.get(
    "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD",
  );
  const contract_address = "0x349270EA694A3E11cdCcaD8244abcedA68a5f5c3";
  let contract = new web3.eth.Contract(abi, contract_address);
  let time = new Date();
  try {
    const reserves = await contract.methods.getReserves().call();
    let riskReserve = numberFormat(reserves._reserve0, "shannon");
    let riskunit = riskReserve / 100000000000;
    let btcReserve = numberFormat(reserves._reserve1, "ether");
    let timestamp = reserves._blockTimestampLast;
    let price = btcReserve / riskunit;
    let usdprice = price * response.data.BTC.USD;
    // console.log("100B RISK/BTC:",price); //BTCB Price
    res.status(200);
    res.send({
      RISKBTCB: usdprice,
      lastupdate: time,
    });
  } catch (e) {
    res.status(400);
    res.send(e);
  } 
  */