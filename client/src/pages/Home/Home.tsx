import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import Cart from "../../components/Cart/Cart";
import CategoryNavbar from "../../components/CategoryNavbar/CategoryNavbar";
import MainNav from "../../components/MainNav/MainNav";
import Products from "../../components/Products/Products";
import IProduct from "../../components/Products/Products.model";
import UpdateProductModal from "../../components/Modals/UpdateProductModal";
import {AdminContext} from "../../context/AdminContext";
import * as moment from "moment";
import CartInfo from "../../components/Modals/CartInfo";
import OrderInfo from "../../components/Modals/OrderInfo";
import NewUserModal from '../../components/Modals/NewUserModal';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [pickedCategory, setPickedCategory] = useState(Number);
    const [cartProducts, setCartProducts] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const {admin, setAdmin} = useContext(AdminContext);
    // Modal & Modal Handling
    const [show, setShow] = useState(false);
    const [changedProduct, setChangedProduct] = useState(null);
    const history = useHistory();

    // Toggle show cart
    const showCartHandler = () => setShowCart(!showCart);

    // When user picks a category
    async function pickCategory(id: number) {
        if (id === 0) {
            const products: IProduct[] = await getProducts();
            setProducts(products);
        } else {
            const {data} = await axios.get(
                `http://localhost:3005/products/category/${id}`
            );
            setPickedCategory(data.products);
        }
    }

    // Get all products from db
    async function getProducts(): Promise<IProduct[]> {
        const {data} = await axios.get("http://localhost:3005/products");
        return data.allProducts;
    }

    // Get cart onLoad
    async function getCart() {
        const user = JSON.parse(localStorage.getItem("activeUser"));
        // Check if user is an admin
        if (user.role === "admin") {
            return setAdmin(user);
        } else {
            // Check if it's a new user
            const newUser = localStorage.getItem('newUser')
            if (newUser) {
                NewUserModal(newUser)
                localStorage.removeItem('newUser');
            }
            const {data} = await axios.get(`http://localhost:3005/cart/${user.id}`);
            // Setting the Cart
            setCartProducts(
                data.oldCart.cartProducts.map((cartProduct) => ({
                    ...cartProduct.product,
                    amount: cartProduct.amount,
                }))
            );
            // Calculate total price
            const totalCartPrice = data.oldCart.cartProducts.map(product => product.total_price)
                .reduce((a, b) => a + b, 0)
            // If cart has products
            if (data.oldCart.cartProducts.length > 0) return CartInfo(moment(data.oldCart.created_at).format('LL'), totalCartPrice)
            // If user ordered before or not
            if (data.lastOrder) return OrderInfo(`${moment(data.lastOrder.created_at).format('LL')}`)
        }
        // If user never ordered
        // data.orders
    }

    // Update cart on db- whenever user add/remove product
    async function updateCartOnDb() {
        if (admin) return;
        const activeUser = JSON.parse(localStorage.getItem("activeUser"));

        await axios.put(`http://localhost:3005/cart/update`, {
            products: cartProducts,
            user: activeUser.id,
        });
    }

    // When adding to cart
    const onAddToCart = async (product) => {
        const exist = cartProducts.find((x) => x.id === product.id);
        if (exist) {
            setCartProducts(
                cartProducts.map((prod) =>
                    prod.id === product.id
                        ? {
                            ...exist,
                            amount: exist.amount + 1,
                        }
                        : prod
                )
            );
        } else {
            setCartProducts([...cartProducts, {...product, amount: 1}]);
        }
        // If cart is not empty, show it to the client.
    };

    // When removing from cart
    const onRemoveFromCart = async (product) => {
        const exist = cartProducts.find((prod) => prod.id === product.id);

        if (exist.amount === 1) {
            setCartProducts(cartProducts.filter((prod) => prod.id !== product.id));
            await emptyCart(product.id);
        } else {
            setCartProducts(
                cartProducts.map((prod) =>
                    prod.id === product.id
                        ? {
                            ...exist,
                            amount: exist.amount - 1,
                        }
                        : prod
                )
            );
        }
    };

    // When emptying cart
    async function emptyCart(productId: number) {
        const userId = JSON.parse(localStorage.getItem("activeUser"));
        await axios.delete(`http://localhost:3005/cart/${userId.id}`, {
            params: {productId: productId},
        });
    }

    // When user Checkout
    async function checkout() {
        history.push("/order");
    }

    // Everytime cartProducts changes
    useEffect(() => {
        updateCartOnDb().catch((e) => console.log(e));
        cartProducts.length ? setShowCart(true) : setShowCart(false);
    }, [cartProducts]);

    // On Page Init => Get Cart
    useEffect(() => {
        getCart()
            .catch((e) => console.log(e));
    }, []);

    return (
        <>
            <>
                <MainNav
                    cartProducts={cartProducts}
                    showCartHandler={showCartHandler}
                    getProducts={getProducts}
                    products={products}
                    setProducts={setProducts}
                    showCart={showCart}
                    setShowCart={setShowCart}
                />

                <CategoryNavbar
                    pickCategory={pickCategory}
                    setPickedCategory={setPickedCategory}
                />
            </>

            <Container fluid style={{width: '90%'}}>
                <Row>
                    <Col>
                        <Products
                            products={products}
                            setProducts={setProducts}
                            pickedCategory={pickedCategory}
                            getProducts={getProducts}
                            onAddToCart={onAddToCart}
                            setShow={setShow}
                            setChangedProduct={setChangedProduct}
                            showCart={showCart}
                        />
                    </Col>
                    {!admin && (
                        <>
                            {showCart && (
                                <Col className='col-auto'>
                                    <Cart
                                        cartProducts={cartProducts}
                                        onAddToCart={onAddToCart}
                                        onRemoveFromCart={onRemoveFromCart}
                                        checkout={checkout}
                                    />
                                </Col>
                            )}
                        </>
                    )}
                </Row>
            </Container>
            {/*   Update Product Modal   */}
            <UpdateProductModal
                show={show}
                setShow={setShow}
                changedProduct={changedProduct}
            />
        </>
    );
};

export default Home;