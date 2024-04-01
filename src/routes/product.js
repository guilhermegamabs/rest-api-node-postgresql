const express = require('express');
const router = express();

const productController = require('../controllers/productController');

const db = require('../services/database');

router.get('/', productController.getAllProducts);
router.post('/', productController.createProducts);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;