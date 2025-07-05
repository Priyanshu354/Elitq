const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

require("dotenv").config();
const router = express.Router();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Multer setup using memory storage
const storage = multer.memoryStorage();
const upload = multer({storage});

// Route to upload image to Cloudinary
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  streamUpload(req)
    .then((result) => res.json({ url: result.secure_url }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
