const db = require('../services/database');

exports.getAllProducts = async(req, res) => {
    try {
        const result = await db.pool.query('SELECT * FROM product');
        return res.status(200).json(result.rows);
    }catch(err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.createProducts = async(req, res) => {
    try {
        const { name, description, price, quantity, category_id } = req.body;

        // const newResult = await db.pool.query({
        //     text: 'SELECT EXISTS (SELECT * FROM product WHERE name = $1, description = $2, price = $3, quantity = $4',
        //     values: [name, description, price, quantity]
        // });

        const newResult = await db.pool.query({
            text: 'INSERT INTO product(name, description, price, quantity, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            values: [name, description, price, quantity, category_id]
        });

        return res.status(201).json(newResult.rows);

    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
}