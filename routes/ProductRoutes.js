const express = require('express')
const router = express.Router();
const ProductController = require('../controller/ProductController')

router.post('/product/Upload-Image', ProductController.uploadImage);
router.post('/product/Add-product', ProductController.addProduct);
router.get('/product/All-products', ProductController.getAllProducts);

module.exports = router