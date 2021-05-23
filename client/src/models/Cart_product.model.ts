export interface ICart_products {
    id: number,
    amount: number,
    total_price: number,
    created_at: Date,
    product: number, // productId
    cart: number // cartId
}