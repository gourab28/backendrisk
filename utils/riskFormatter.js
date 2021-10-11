const web3 = require("web3");
module.exports = {
  riskFormat(num) {
    return web3.utils.fromWei(num, "shannon");
  }
}