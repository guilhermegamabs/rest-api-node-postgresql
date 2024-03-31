const db = require('../services/database');

exports.getAllProducts = async(req, res) => {
    try {
        const result = await db.pool.query('SELECT * FROM product');
        return res.status(200).json(result.rows);
    }catch(err) {
        return res.status(500).json({ error: err.message });
    }
};