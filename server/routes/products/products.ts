import {getRepository} from "typeorm";
import {Category} from "../../db/entity/Category";
import {Product} from '../../db/entity/Product';
import {User} from "../../db/entity/User";

const express = require('express');
const router = express.Router();

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
    const {name, price, image_url, category} = req.body
    const categoryRepo = getRepository(Category);
    const productRepo = getRepository(Product);

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
                message: `${newProduct.name} Has been successfully added!`,
                product: newProduct
            })
        })
        .catch(err => {
            console.log(err)
            res.json({message: err})
        })


})

// Updating a product
router.post('/update', async (req, res) => {
    const {id, name, image_url, price, category} = req.body

    const productRepo = getRepository(Product);

    try {
        const changedProduct = await productRepo.findOne({
            where: {id}
        })
        await productRepo.save({
            id,
            name,
            image_url,
            price,
            category
        })
        res.json({
            message: `${name} was successfully updated!`,
            status: 'ok',

        })
    } catch (e) {
        console.log(e);
        res.json({message: 'something went wrong while updating a product'})

    }

})

module.exports = router


