const express = require('express');
const app = express();
const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');

app.use('/category', categoryRoute);
app.use('/product', productRoute);

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
});