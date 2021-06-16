import {getRepository} from "typeorm";
import {Orders} from "../db/entity/Orders";
import {Product} from "../db/entity/Product";

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const orderRepo = getRepository(Orders);
    const productRepo = getRepository(Product);

    const allOrders = await orderRepo.find()
    const allProducts = await productRepo.find()

    res.json({
        orders: allOrders.length,
        products: allProducts.length
    })
})

module.exports = router