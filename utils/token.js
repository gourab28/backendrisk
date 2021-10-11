const web3 = require("web3");

module.exports = {
  numberFormat(num, unit) {
    return web3.utils.fromWei(num, unit);
  }
}
