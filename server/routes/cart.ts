import {getRepository, In} from "typeorm";
import {Cart} from "../db/entity/Cart";
import {Cart_product} from "../db/entity/Cart_product";
import {Product} from "../db/entity/Product";

const express = require('express');
const router = express.Router();

interface ICartProduct {
    id: number,
    amount: number,
    total_price: number,
    product: number, // productId
    cart: number // cartId
}

// Check if there is an old cart, if not, create new one
router.get('/:id', async (req, res) => {
    const user: number = req.params.id;
    const cartRepo = getRepository(Cart);

    try {
        const oldCart = await cartRepo.findOne({
            where: {user, status: 'in-progress'},
            relations: ['cartProducts']
        })
        if (!oldCart) {
            const newCart = cartRepo.create({user: req.params.id});
            await cartRepo.save(newCart)
            return res.json({message: 'New cart was created', newCart})
        } else {
            return res.json({message: 'There is an incomplete cart', oldCart})
        }
    } catch (e) {
        console.log(e)
    }

})

router.put('/update', async (req, res) => {
    const {products, user: userId} = req.body;

    // cartProduct and Cart Repositories
    const cartProductRepo = getRepository(Cart_product);
    const cartRepo = getRepository(Cart);

    // Get old cart from db and Joins the cartProducts
    const oldCart = await cartRepo.findOne({
        relations: ['cartProducts'],
        where: {user: {id: userId}}
    })

    //
    for (const product of products) {
        // Checking if products are not already in the cart

        const cartProduct = oldCart.cartProducts.find(({product: prod}) => product.id === prod.id)
        if (cartProduct) {
            cartProduct.amount = product.amount
            await cartProduct.save();
        } else {
            await cartProductRepo.save({
                cart: oldCart,
                product: product.id,
                amount: product.amount,
                total_price: (product.amount * product.price)
            })
        }
    }
    res.json({status: 'ok'})
})

module.exports = router;









