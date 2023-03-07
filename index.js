require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const bodyparser=require('body-parser');
const productRouter = require("./routes/product.route");

const connect = require("./config/db");
const app = express();
app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);
const port = process.env.PORT;
app.use("/product", productRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

// starting server
app.listen(port, async() => {
  connect();
  console.log(`local host :${port}`);
});


// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyparser=require('body-parser');

// const connect = require("./config/db");
// const port = process.env.PORT || 8000;

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use(bodyparser.urlencoded({extended:false}))
// app.use(bodyparser.json());

// mongoose.set("strictQuery", false);



// app.get("/", (req, res) => {
// 	res.send("hello world!");
// });


// app.listen(port, async () => {
// 	connect()
// 	console.log(`Listening at http://localhost:${port}`);
// });
