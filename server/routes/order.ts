import e = require("express");
import {getRepository} from "typeorm";
import {Cart} from "../db/entity/Cart";
import {Orders} from "../db/entity/Orders";

const express = require('express');
const router = express.Router();
const moment = require('moment');


// Get
router.get('/', async (req, res) => {

})

// Place order
router.post('/', async (req, res) => {
    const {city, street, credit_card, total_price, delivery_date, cartId, user} = req.body

    const orderRepo = getRepository(Orders);
    const cartRepo = getRepository(Cart);

    try {
        // Find an OPEN cart for the specific user
        const cartExist = await cartRepo.findOne({
            where: {
                user,
                "status": 'open'
            }
        });


        // Making sure the cart we received is the same as the cart on the DB
        if (cartExist.id !== cartId) return res.json({status: 400, message: 'Nice try ;)'})
        // Making sure the date is available
        const allDates = await orderRepo.find()

        // Count if theres more then 3 orders for the specific day
        const counter = allDates
            .reduce((count, curr) => curr.delivery_date === delivery_date && count++, 0);

        const tagsFromOutsource = ['Leaf Problem', 'Plant Disease', 'Poop face'];
        const arr = [{name: 'Leaf Problem', id: 1}, {name: 'Plant Disease', id: 2}, {name: 'Poop face', id: 3}];
        const map = arr.reduce((map, tag) => {
            map[tag.name] = tag.id;
            return map;
        } ,{});
        tagsFromOutsource.forEach(tag => {
            const id = map[tag];
        })

        // If more then 3 orders for this date, tell client deliveries are full
        if (counter >= 3) return res.json({
            status: 404,
            message: 'Unfortunately, our deliveries are full for this selected day, please check another date'
        })
        // Placing a new Order after the cart validations
        const newOrder = await orderRepo.create({
            city,
            street,
            credit_card,
            total_price,
            delivery_date,
            cart: cartId,
            user
        }).save();

        // Closing the cart
        cartExist.status = 'shipping'
        await cartExist.save();
        // Responding to the client
        res.json({
            status: 'ok',
            order: newOrder
        })
    } catch (e) {
        console.log(e)
        res.json({status: 404, message: 'Sorry, something went wrong.'})
    }
})

module.exports = router