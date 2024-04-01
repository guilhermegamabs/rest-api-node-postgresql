const db = require('../services/database');

exports.getAllProducts = async(req, res) => {
    try {
        const result = await db.pool.query('SELECT * FROM product');
        return res.status(200).json(result.rows);
    }catch(err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.createProducts = async (req, res) => {
    try {
        const { name, description, price, quantity, category_id } = req.body;

        if(!name) return res.status(422).json({ error: 'Name is required!' });

        const existsResult = await db.pool.query({
            text: 'SELECT EXISTS (SELECT * FROM product WHERE name = $1)',
            values: [name]
        });

        if(existsResult.rows[0].exists) return res.status(400).json({ error: `Product ${name} already exists!` });

        const newResult = await db.pool.query({
            text: 'INSERT INTO product(name, description, price, quantity, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            values: [name, description, price, quantity, category_id]
        });

        return res.status(201).json(newResult.rows);

    } catch(err) {
        return res.status(500).json({ error: 'hELLO WORLD!' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, quantity, category_id } = req.body;

        if(!id) return res.status(422).json({ error: 'ID is required!' });

        const existsResult = await db.pool.query({
            text: 'SELECT EXISTS (SELECT * FROM product WHERE id = $1)',
            values: [id]
        });

        if(!existsResult.rows[0].exists) return res.status(400).json({ error: `Product ${name} doesn't exists!` });

        const updateProduct = await db.pool.query({
            text: 'UPDATE product SET name = $1, description = $2, price = $3, quantity = $4, category_id = $5 WHERE id = $6 RETURNING *',
            values: [name, description, price, quantity, category_id, id]
        });

        return res.status(201).json(updateProduct.rows);

    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
};