import {getRepository} from "typeorm";
import {Product} from "../../db/entity/Product";

const express = require('express');
const router = express.Router();
const axios = require('axios');


//   Amir is the fucking king םכ products!
router.get('/amir', async (req, res) => {
    const {data} = await axios.post('https://api.powerdrop.io/v1/products/get',
        {
            "amount": 1,
            "categoryId": 67670
        },
        {
            headers:
                {Token: process.env.AMIR_TOKEN, "Content-Type": "application/json"}
        })
    const productArr = []
    data.map(product => {
        productArr.push(
            {name: product.title, price: product.price, image_url: product.picture, category: 11}
        )
    })
    for (const product of productArr) {
        const productRepo = getRepository(Product);

        const addedProducts = await productRepo.create(product);
        await productRepo.save(addedProducts).catch(err => console.log(err))
    }
})