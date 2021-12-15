const mongoose  = require("mongoose")
const Product = require("../models/product.model")
const router = require("express").Router()
const User = require("../models/user.model")
const { isAuthenticated } = require("./../middleware/jwt.middleware");

const fileUploader = require('../config/cloudinary.config');






// POST /api/products - Create a new product - (ADMIN)
router.post('/api/products', async (req, res, next) => {
    try {
      // Get the data from the request body
      const { title, price, description, image, role, category } = req.body;
  
      // Save the data in the db
      const createdProduct = await Product.create({ title, price, description, image, role, category});
  
      res.status(201).json(createdProduct);  // 201 Created
  
    } catch (error) {
      res.status(500).json(error); // Internal Server Error
    }
});

// GET /api/products - Get all existing products 
router.get('/api/products', async (req, res, next) => {
    try {
      const allProducts = await Product.find();
  
      res.status(200).json(allProducts); 

    } catch (error) {
      res.status(500).json(error);
    }
});

//GET /api/products/:productId -Get one product
router.get('/api/products/:productId', async (req, res, next) => {
    try {
      // Get the project id from the URL
      const { productId } = req.params;  //   in Express `:` means `req.params` 
  
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(400).json({ message: "Invalid product id" });
        return;
      }
  
      // Make a DB query
      const oneProduct = await Product.findById(productId);
  
      // Send the response
      res.status(200).json(oneProduct);

    } catch (error) {
      res.status(500).json(error);
    }
});

//PUT /api/products/:productId - (Edit product) - Update a specific product (ADMIN)
router.put('/api/products/:productId', async (req, res, next) => {
  try {
    
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }    

    // Values to use for updating the project
    const { title, image, price, description, role, category} = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { title, image, price, description, role, category }, 
      { new: true });
    
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
})

// DELETE /api/products/:productId  - Delete IN THE DATA BASE a specific project (ADMIN)
router.delete('/api/products/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }

    await Product.findByIdAndDelete(productId);

    res.status(204).send();// No Content
  } catch (error) {
    res.status(500).json(error);
  }

})

//USER ACTION ----------------------------------------------------------------------------------------------------------

//addcart - /api/product/:producttId - (USER)
router.put('/api/product/:productId', isAuthenticated, async(req,res,next) => {
    try {
        
    const currentUser = req.payload
    const  userId = currentUser._id
    const {productId} = req.params;
        
    if (!mongoose.Types.ObjectId.isValid(productId)) {
            res.status(400).json({message:"Invalid Object Id"});
            return;
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push:{addCart:productId}
      },
      {new:true})

    res.status(200).json(updatedUser);
}   catch (error) {
    res.status(500).json(error);
}
})

//DELETE - /api/product/:productId - DELETE ITENS IN THE CART (USER)
router.delete('/api/product/:productId', isAuthenticated, async(req,res,next) => {
  try {
      
  const currentUser = req.payload
  const  userId = currentUser._id
  const {productId} = req.params;
      
  if (!mongoose.Types.ObjectId.isValid(productId)) {
          res.status(400).json({message:"Invalid Object Id"});
          return;
  }
  
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $pull:{addCart:productId}
    },
    {new:true})

  res.status(200).json(updatedUser);
}   catch (error) {
  res.status(500).json(error);
}
});


module.exports = router;












