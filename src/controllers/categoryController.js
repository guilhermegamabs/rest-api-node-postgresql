const db = require('../services/database');

exports.getAllCategories = async (req, res) => {
    try {
        const result = await db.pool.query('SELECT * FROM category');
        return res.status(200).json(result.rows);
    } catch(err) {
        return res.status(500).json({ error: err.message});
    }
}

exports.createCategory = async(req, res) => {
    try{
        const { name } = req.body;

        const text = 'INSERT INTO category(name) VALUES($1) RETURNING *';
        const values = [name];
        const result = await db.pool.query(text, values);
        return res.status(200).json(result.rows);
    } catch(err) {
        return res.status(500).json({ error: err.message});
    }
}