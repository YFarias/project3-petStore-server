const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware");
const Product = require("../models/product.model")


// GET /api/users - Get all user 
router.get('/api/users', async (req, res, next) => {
  try {
    const allUsers = await User.find();

    res.status(200).json(allUsers); 

  } catch (error) {
    res.status(500).json(error);
  }
});

// PUT /api/users/current  - Update the current user
router.put('/api/users/current', isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.
  
    const currentUser = req.payload;
    const { email, name, address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      { email, name, address},
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
})

// GET /api/users/current  - Get current user information and update addCart populate
router.get('/api/users/current', isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.
  
    const currentUser = req.payload;
    const user = await User.findById(currentUser._id).populate("addCart");

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
})


module.exports = router;
