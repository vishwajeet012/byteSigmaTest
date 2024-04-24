const express = require('express');
const router = express.Router();
const imageController = require('../controller/imageController');

// Endpoint for uploading images
router.post('/upload', imageController.handleUpload, imageController.uploadImage);

// Endpoint for fetching list of uploaded images
router.get('/images', imageController.getImages);

module.exports = router;