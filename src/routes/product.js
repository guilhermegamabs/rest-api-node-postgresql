const express = require('express');
const router = express();

const productController = require('../controllers/productController');

const db = require('../services/database');

router.get('/', productController.getAllProducts);


module.exports = router;