const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    productId: {type:Number,required:true},
    quantity:{type:Number,required:true}
})


const ProductModel = mongoose.model("products",ProductSchema)

module.exports = ProductModel