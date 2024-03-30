const express = require('express');
const app = express();
const PORT = 3333;

const db = require('./services/database');

app.use(express.json());

app.get('/category', async (req, res) => {
    try {
        const result = await db.pool.query('SELECT * FROM category');
        return res.status(200).json(result.rows);
    } catch(err) {
        return res.status(500).json({ error: err.message});
    }
});

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
});