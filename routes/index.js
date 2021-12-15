const router = require("express").Router();

// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});


//Post/api/upload -Used for Uploading an image
router.post("/api/upload", 
fileUploader.single("image"), (req,res,next) =>{

  if(!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({secure_url: req.file.path})

})

module.exports = router;
