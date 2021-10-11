const mongoose = require("mongoose");
const Double = require("@mongoosejs/double");
const Supply = mongoose.Schema({
  totalSupply: {
    type: Double,
    default: 0
  },
  totalMarketing: {
      type: Double,
      default: 0
  },
  totalFees: {
      type: Double,
      default: 0
  },
  totalBurn: {
      type: Double,
      default: 0
  },
  time : { type : Date, default: Date.now }
});
Supply.set('timestamp', true);
module.exports = mongoose.model("supply", Supply);
