const { Router } = require("express");
const ProductModel = require("../model/product.model");
const express = require("express");
const app = express();
const productRouter = Router();

productRouter.post("/", async (req, res) => {
  const data = req.body;
  try {
    for (let i = 0; i < data.length; i++) {
      console.log(data[i])
      if (data[i].operation === "add") {
        const pro = await ProductModel.find({ productId: data[i].productId });
        console.log(pro)
        if (pro.length > 0) {
          const product = await ProductModel.findByIdAndUpdate(
            { _id: pro[0]._id },
            { quantity: pro[0].quantity + data[i].quantity }
          );
          console.log("Add",product)
        } else {
          const product = await ProductModel.create({
            productId: data[i].productId,
            quantity: 0,
          });
          console.log(product)
        }
      } else if (data[i].operation === "subtract") {
        const pro = await ProductModel.find({ productId: data[i].productId });
        let diff = pro[0].quantity - data[i].quantity 
        if (pro.length > 0 && diff >= 0) {
          const product = await ProductModel.findByIdAndUpdate(
            { _id: pro[0]._id },
            { quantity: diff}
          );
        }else if (pro.length > 0 && diff < 0) {
          const product = await ProductModel.findByIdAndUpdate(
            { _id: pro[0]._id },
            { quantity: 0}
          );
        }  else {
          const product = await ProductModel.create({
            productId: data[i].productId,
            quantity: 0,
          });
        }
      }
    }
    const totalpro = await ProductModel.find()
    res.status(201).send(totalpro)
  } catch (err) {
    res.status(400).send({message:"failure",err})
  }
});

productRouter.get("/", async (req, res) => {
  const totalpro = await ProductModel.find()
    res.status(201).send(totalpro)
})


module.exports = productRouter;
