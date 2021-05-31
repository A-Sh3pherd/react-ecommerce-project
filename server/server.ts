// Packages
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT;
import { createConnection } from "typeorm";
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Route imports
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const productRoute = require('./routes/products/products')
const categoryRoute = require('./routes/category')
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
//Routes
app.get('/', (req, res) => {
    res.send('Hello World')
})
// Login
app.use('/login', loginRoute);

// Register
app.use('/register', registerRoute);

// Products
app.use('/products', productRoute);

//Categories
app.use('/category', categoryRoute);

// Cart
app.use('/cart', cartRoute);

// Order
app.use('/order', orderRoute);

//Loading Server
createConnection()
    .then(async () => {
        app.listen(port, () => {
            console.log(`Server is up on port ${port}`)
            console.log(`Database is up on port 3306`)
        })
    })
    .catch(err => console.log(err))
