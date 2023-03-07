const { Router } = require("express");
const ProductModel = require("../model/product.model");
const express = require("express");
const app = express();
const productRouter = Router();

productRouter.post("/", async (req, res) => {
  const data = req.body;
  try {
    for (let i = 0; i < data.length; i++) {
      if (data[i].operation === "add") {
        const pro = await ProductModel.findById({ id: data[i].productId });
        if (pro) {
          const product = await ProductModel.findByIdAndUpdate(
            { id: data[i].productId },
            { quantity: pro.quantity + data[i].quantity }
          );
        } else {
          const product = await ProductModel.create({
            productId: data[i].productId,
            quantity: 0,
          });
        }
      } else if (data[i].operation === "substract") {
        const pro = await ProductModel.findById({ id: data[i].productId });
        if (pro) {
          const product = await ProductModel.findByIdAndUpdate(
            { id: data[i].productId },
            { quantity: pro.quantity - data[i].quantity }
          );
        } else {
          const product = await ProductModel.create({
            productId: data[i].productId,
            quantity: 0,
          });
        }
      }
    }
  } catch (err) {
    res.status(400).send({message:"failure",err})
  }
});


module.exports = productRouter;
