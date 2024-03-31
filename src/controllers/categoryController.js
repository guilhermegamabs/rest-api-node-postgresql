const db = require('../services/database');

exports.getAllCategories = async (req, res) => {
    try {
        const result = await db.pool.query('SELECT * FROM category');
        return res.status(200).json(result.rows);
    } catch(err) {
        return res.status(500).json({ error: err.message});
    }
}

exports.createCategory = async (req, res) => {
    try{
        const { name } = req.body;

        if(!name) {
            return res.status(422).json({ error: 'Name is required!' });
        };

        const existsResult = await db.pool.query({
            text: 'SELECT EXISTS (SELECT * FROM category WHERE name = $1)',
            values: [name]
        });

        if(existsResult.rows[0].exists) {
            return res.status(400).json({ error: `Category ${name} already exists!` });
        }

        const newResult = await db.pool.query({
            text: 'INSERT INTO category(name) VALUES($1) RETURNING *',
            values: [name]
        });

        return res.status(201).json(newResult.rows);
    } catch(err) {
        return res.status(500).json({ error: "Hello World!"});
    }
}