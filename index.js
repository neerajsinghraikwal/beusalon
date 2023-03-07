require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const bodyparser=require('body-parser');
const connect = require("./config/db");
const productRouter = require("./routes/product.route");

const app = express();
app.use(express);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());
// app.use("/product", productRouter);
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello world");
});

// starting server
app.listen(port, async() => {
  connect();
  console.log(`local host :${port}`);
});
