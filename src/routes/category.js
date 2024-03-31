const express = require('express');
const router = express()

const db = require('../services/database');

router.get('/', async (req, res) => {
    try {
        const result = await db.pool.query('SELECT * FROM category');
        return res.status(200).json(result.rows);
    } catch(err) {
        return res.status(500).json({ error: err.message});
    }
});


module.exports = router;  