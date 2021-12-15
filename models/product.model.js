const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, requitre: true },
  imageUrl: { type: String, default: "https://i.imgur.com/yWHfhiG.png" },
  quantity: {type: Number, require:true},
  category: {type: String, require:true},
  description: { type: String, required: true },
});


const Product = model("Product", productSchema);
module.exports = Product;