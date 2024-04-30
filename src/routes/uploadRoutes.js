const express = require('express');
const uploadController = require("../controllers/uploadController")
const uploadRouter = express.Router();

const multer = require("multer");
const upload = multer({ dest: './public/assets/uploads'})

uploadRouter.get("/upload/", uploadController.getImage);
uploadRouter.post("/upload/", upload.single('image'), uploadController.uploadImage)


module.exports = uploadRouter;