const mongoose = require("mongoose");

const USD_Price = mongoose.Schema({
  usd_price: {
    type: Number,
    default: 0
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '30m' },
  },
  time : { type : Date, default: Date.now }
});
module.exports = mongoose.model("usd_price", USD_Price);
