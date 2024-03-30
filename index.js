const express = require('express');
const app = express();
const PORT = 3333;

app.use(express.json());

app.get('/', (req, res) => {
    res.send({ message: 'Hello World!' });
});

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
});