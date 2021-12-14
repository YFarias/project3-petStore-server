const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address:{type: String, require:true},
  addCart:[ {type: Schema.Types.ObjectId,  ref: 'Product'} ],
  myHistory:[{type: Schema.Types.ObjectId,  ref: 'Product'}],
  role: { type: String, enum: ["admin", "user"], default: "user" },
  cart:{ type: String, default:"../image/shopping-cart.png" },

  });



const User = model("User", userSchema);

module.exports = User;


//array de produtos total gasto 