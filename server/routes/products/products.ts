import {getRepository} from "typeorm";
import axios from 'axios';

const express = require('express');
const router = express.Router();
import {Product} from '../../db/entity/Product'
import {User} from "../../db/entity/User";
import {Category} from "../../db/entity/Category";
import IProduct from "./product.model";

// Get all products, including categories for each product
router.get('/', async (req, res) => {
    const productRepo = getRepository(Product)

    productRepo.find({relations: ['category']})
        .then(products => {
            res.json({allProducts: products})
        })
        .catch(err => console.log(err))
})

// Get products based on category ID
router.get('/category/:id', async (req, res) => {
    const categoryRepo = getRepository(Category);
    const productRepo = getRepository(Product);
    const categoryId = req.params.id

    if (categoryId === 0) return res.json({})
    // find all categories with the relations of PRODUCTS, where category = query
    const productsBasedOnCategoryId = await productRepo.find({
        relations: ['category'],
        where: {'category': categoryId}
    })

    // Respond to Client
    res.json({
        products: productsBasedOnCategoryId
    })
})

// Add products
router.post('/', async (req, res) => {
    const userRepo = getRepository(User);
    const categoryRepo = getRepository(Category);
    const productRepo = getRepository(Product);
    const {name, price, image_url, category} = req.body

    // Fetching all categories
    const allCategories = []
    const categories = await categoryRepo.find({select: ['id', 'name']})
    categories.map(category => {
        allCategories.push(category)
    })

    // Creating new product
    const newProduct = productRepo.create({name, price, image_url, category})
    await productRepo.save(newProduct)
        .then(() => {
            res.json({
                products: newProduct,
                // categories: allCategories
            })
        })
        .catch(err => console.log(err))


})

//   Amir is the fucking king for products!
router.get('/amir', async (req, res) => {
    console.log('you entered')
    const {data} = await axios.post('https://api.powerdrop.io/v1/products/get',
        {
            "amount": 1,
            "categoryId": 67670
        },
        {
            headers:
                {Token: process.env.AMIR_TOKEN, "Content-Type": "application/json"}
        })
    // console.log(data)
    const productArr = []
    data.map(product => {
        productArr.push(
            {name: product.title, price: product.price, image_url: product.picture, category: 11}
        )
    })
    productArr.forEach(async (product) => {
        const productRepo = getRepository(Product);

        const addedProducts = await productRepo.create(product);
        // console.log(addedProducts)
        await productRepo.save(addedProducts).catch(err => console.log(err))
        console.log('Saved!!!!!!')
    })
})

module.exports = router


