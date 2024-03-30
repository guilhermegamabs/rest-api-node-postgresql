const express = require('express');
const app = express();
const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const categoryRoute = require('./routes/category');

app.use('/category', categoryRoute);

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
});