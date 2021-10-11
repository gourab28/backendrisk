const fetch = require("node-fetch");
/**
 * BNBScan Last 10 Transactions
 */
async function getLastTx(req, res) {
  try {
    fetch(
      "https://api.bscscan.com/api?module=account&action=txlist&address=0x0d89a8f99d0a41b3f789af628b3094abf4e846e0&startblock=1&endblock=99999999&page=1&offset=10&sort=desc&apikey=2Q8CZ6UIJMYSMM1K9B57EQZ7I8TFGZ4X1B"
    )
      .then((res) => res.json())
      .then((data) => res.json(data.result));
  } catch (error) {
    res.status(400);
    res.send(error);
  }
}

module.exports = { getLastTx };
