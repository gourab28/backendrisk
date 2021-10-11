const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connectDB } = require("./config/db");
const { supplyRouter } = require("./routes/supplys")
const { liquidityRouter } = require("./routes/liquidity");
const { usdRoute } = require("./routes/usdRoute");
const { tokenRouter } = require("./routes/bnb");
const { txRoute } = require("./routes/latestTx");
const { searchRoute } = require("./routes/search");
const { AccountRoute } = require("./routes/AccountRoute");
const  { scanRoute } = require("./routes/scan");
// connecting to mongodb.
connectDB();
//config express app
const PORT = process.env.PORT || 5004;
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.disable('etag');

app.get("/", (req, res) => {
    res.send("RISK.MARKET");
});
// connecting to Router.
app.use("/api", supplyRouter);
app.use("/api", usdRoute);
app.use("/api", tokenRouter);
app.use("/api", liquidityRouter);
app.use("/api", txRoute);
app.use("/api", searchRoute);
app.use("/api", AccountRoute);
app.use("/api", scanRoute);

// making server listen on port.
app.listen(PORT, console.log("Server listening on port: ", PORT));