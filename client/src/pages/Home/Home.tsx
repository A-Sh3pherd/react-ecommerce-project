import React, {useEffect, useState} from 'react';
import MainNav from '../../components/MainNav/MainNav';
import CategoryNavbar from '../../components/CategoryNavbar/CategoryNavbar';
import Products from '../../components/Products/Products';
import axios from 'axios';
import IProduct from '../../components/Products/Products.model';
import Cart from "../../components/Cart/Cart";
import {Col, Container, Row} from "react-bootstrap";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [pickedCategory, setPickedCategory] = useState(Number);
    const [cartProducts, setCartProducts] = useState([]);


    // When user picks a category
    async function pickCategory(id: number) {
        if (id === 0) {
            const products: IProduct[] = await getProducts();
            setProducts(products);
        } else {
            const {data} = await axios.get(`http://localhost:3005/products/category/${id}`)
            console.log(data.products)
            setPickedCategory(data.products)
        }
    }

    // Get all products from db
    async function getProducts(): Promise<IProduct[]> {
        const {data} = await axios.get('http://localhost:3005/products');
        return data.allProducts
    }

    // Get cart onLoad
    async function getCart() {
        const user = JSON.parse(localStorage.getItem('activeUser'));

        const {data} = await axios.get(`http://localhost:3005/cart/${user.id}`);
        return data
    }

    async function updateCartOnDb(products: object) {
        const activeUser = JSON.parse(localStorage.getItem('activeUser'));

        await axios.put(`http://localhost:3005/cart/update`, {
            products: cartProducts,
            user: activeUser.id
        })
    }

    // When adding to cart
    const onAddToCart = async (product) => {
        const exist = cartProducts.find(x => x.id === product.id)
        if (exist) {
            setCartProducts(cartProducts.map(prod => prod.id === product.id ? {
                    ...exist,
                    amount: exist.amount + 1
                }
                : prod));
        } else {
            setCartProducts([...cartProducts, {...product, amount: 1}])
        }
    }

    // When removing from cart
    const onRemoveFromCart = async (product) => {
        const exist = cartProducts.find((prod) => prod.id === product.id);
        if (exist.amount === 1) {
            setCartProducts(cartProducts.filter(prod => prod.id !== product.id))
        } else {
            setCartProducts(cartProducts.map(prod => prod.id === product.id ? {
                ...exist,
                amount: exist.amount - 1
            } : prod));
        }
    }


    useEffect(() => {
       getCart()
           .then(r => {
               const banana = r.oldCart.cartProducts.map(product => product)
               console.log(banana)
               setCartProducts(r.oldCart.cartProducts.map(cartProduct => ({...cartProduct.product, amount: cartProduct.amount })))
           })
           .catch(e => console.log(e))
    },[])

    return (
        <>
            <>
                <MainNav/>
                <CategoryNavbar
                    pickCategory={pickCategory}
                    setPickedCategory={setPickedCategory}/>
            </>

            <Container fluid className="product-and-cart d-flex" style={{width: '80%'}}>
                <Row>
                    {/*<h1>Hello home page!</h1>*/}
                    <Col>
                        <Products
                            products={products}
                            setProducts={setProducts}
                            pickedCategory={pickedCategory}
                            getProducts={getProducts}
                            onAddToCart={onAddToCart}
                        />
                    </Col>
                </Row>

                {cartProducts.length > 0 ?
                    <Col>
                        <Cart
                            cartProducts={cartProducts}
                            onAddToCart={onAddToCart}
                            onRemoveFromCart={onRemoveFromCart}
                            updateCartOnDb={updateCartOnDb}
                        />
                    </Col>
                    : null}
            </Container>


        </>
    );
};

export default Home;
