export default interface IProduct {
    id: number,
    name: string,
    price: number,
    image_url: string,
    created_at: Date,
    categoryId: number
}