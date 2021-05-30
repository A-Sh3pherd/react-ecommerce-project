import { getRepository } from "typeorm";
import { Cart } from "../db/entity/Cart";
import { Cart_product } from "../db/entity/Cart_product";

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
            where: { user, status: 'open' },
            relations: ['cartProducts']
        })
        if (oldCart) {
            res.json({ message: 'There is an incomplete cart', oldCart })
        } else {
            const newCart = cartRepo.create({ user: req.params.id });
            await cartRepo.save(newCart)
            return res.json({ message: 'New cart was created', newCart })
        }
    } catch (e) {
        console.log(e)
    }

})

// On Update
router.put('/update', async (req, res) => {
    const { products, user: userId } = req.body;

    const cartProductRepo = getRepository(Cart_product);
    const cartRepo = getRepository(Cart);

    // Locating the old cart
    const oldCart = await cartRepo.findOne({
        relations: ['cartProducts'],
        where: { status: 'open', user: { id: userId } }
    })
    const oldCart_cartProducts = oldCart.cartProducts
    const productId: [] = products.map(product => product.id)

    // Looping through all products and updating the amount and existance
    for (const product of products) {
        // Fill cartProduct with the data from the the old cart
        const productExist = oldCart.cartProducts.find(({ product: prod }) => product.id === prod.id)

        // If product exist, just change the amount
        if (productExist) {
            productExist.amount = product.amount
            await productExist.save();
        } else {
            await cartProductRepo.save({
                cart: oldCart,
                amount: product.amount,
                product: product.id,
                total_price: (product.amount * product.price)
            });
        }
    }

    res.json({ status: 'ok'})
})


// On removing item from cart
router.delete('/:userId', async (req, res) => {
    const userId = req.params.userId
    const product = req.query.productId

    try {
        // Query builder from deleting the specific product
        const cartProductRepo = getRepository(Cart_product);
        await cartProductRepo.createQueryBuilder()
            .delete()
            .from(Cart_product)
            .where("product = :id", { id: product })
            .execute()
            .then(() => {
                res.json({ message: 'Product was successfully removed from cart' })
            })
    } catch (e) {
        console.log(e)
    }

})

module.exports = router;









