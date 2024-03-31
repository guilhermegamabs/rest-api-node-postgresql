const express = require('express');
const router = express()

const categoryController = require('../controllers/categoryController');

const db = require('../services/database');

router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;  