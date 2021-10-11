const Web3 = require("web3");
let bsc = "https://bsc-dataseed.binance.org/";
var web3 = new Web3(new Web3.providers.HttpProvider(bsc));

async function scanTxn (req, res) {
  const hash = req.params.id;
  try {
    const response = await web3.eth.getTransaction(hash);
    res.status(200);
    res.send(response);
  } catch (e) {
    res.status(400);
    res.send(e);
  }
}
module.exports = { scanTxn }