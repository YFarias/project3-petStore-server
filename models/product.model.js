const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, requitre: true },
  image: { type: String, default: "https://i.imgur.com/yWHfhiG.png" },
  quantity: {type: Number, require:true},
  totalAmount: {type:Number, require: true},
});



const Product = model("Product", productSchema);
module.exports = Product;