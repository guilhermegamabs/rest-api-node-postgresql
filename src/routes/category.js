const express = require('express');
const router = express()

const categoryController = require('../controllers/categoryController');

const db = require('../services/database');

router.get('/', categoryController.getAllCategories);

router.get('/');


module.exports = router;  