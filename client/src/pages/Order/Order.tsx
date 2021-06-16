import {useContext, useEffect, useState} from "react";
import "./Order.css";
import axios from "axios";
import {Col, Container, Nav, Row} from "react-bootstrap";
import CheckoutCart from "../../components/CheckoutCart/CheckoutCart";
import OrderForm from "../../components/OrderForm/OrderForm";
import {useHistory} from "react-router-dom";
import {AdminContext} from "../../context/AdminContext";
import OrderCompleteModal from "../../components/Modals/OrderCompleteModal";
import {Link} from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';

const Order = () => {
    const [cart, setCart] = useState({id: 0, products: []});
    const [showCart, setShowCart] = useState(true);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();
    const {admin} = useContext(AdminContext);
    // Modal Handling
    const [show, setShow] = useState(false);

    const itemsPrice = cart.products.reduce(
        (a, product) => a + product.price * product.amount,
        0
    );
    // Extra charges
    const tax = itemsPrice * 0.2;
    const shipping = itemsPrice > 150 ? 0 : 50;
    const totalPrice = itemsPrice + tax + shipping;
    // Toggle show cart
    const showCartHandler = () => setShowCart(!showCart);
    // Get cart Function
    const getCart = async () => {
        const user = JSON.parse(localStorage.getItem("activeUser"));

        try {
            const {data} = await axios.get(`http://localhost:3005/cart/${user.id}`);
            // If cart is empty, redirect user back home
            if (data.oldCart.cartProducts.length === 0) history.push("/");
            setCart({
                id: data.oldCart.id,
                products: data.oldCart.cartProducts.map((prod) => ({
                    ...prod.product,
                    amount: prod.amount,
                    total_price: prod.total_price,
                })),
            });
        } catch (e) {
            console.log(e);
        }
    };

    // Placing an order
    const placeOrder = async (
        city: string,
        street: string,
        credit_card: string,
        delivery_date: string
    ) => {
        const user = JSON.parse(localStorage.getItem("activeUser"));
        // Credit card validation
        if (credit_card.length < 4) return alert('Credit card number must be at least 4 Digits')
        // Placing an order
        const {data} = await axios.post("http://localhost:3005/order", {
            city,
            street,
            credit_card,
            delivery_date,
            total_price: totalPrice,
            cartId: cart.id,
            user: user.id,
        });
        if (data.status === "ok") {
            setOrderPlaced(true)
            // Runs the Modal
            setShow(true);
        } else {
            alert(data.message);
        }
    };

    // Get cart onInit
    useEffect(() => {
        if (admin) return history.push("/");
        getCart();
    }, []);

    return (
        <>
            <Container>
                <Nav className={'d-flex justify-content-center mt-5'}>
                    <Nav.Item>
                        <Link to='/' style={{fontSize: '24px'}}>
                            <span className={!orderPlaced ? 'd-flex align-items-center' : 'hidden-nav'}>
                                <AiIcons.AiOutlineArrowLeft style={{marginRight: '5px'}}/> Go Back
                            </span>
                        </Link>
                    </Nav.Item>
                </Nav>
                {/*    Modal    */}
                <OrderCompleteModal
                    show={show}
                    setShow={setShow}
                    cart={cart}
                />
                {/*     Cart     */}
                <Row>
                    <Col className={orderPlaced ? 'col-10' : 'col-6'}>
                        {showCart && (
                            <CheckoutCart
                                cart={cart}
                                itemsPrice={itemsPrice}
                                tax={tax}
                                shipping={shipping}
                                totalPrice={totalPrice}
                                orderPlaced={orderPlaced}
                            />
                        )}
                    </Col>
                    {/*   Order Form   */}
                    {!orderPlaced && (<Col className={"col-6"}>
                        <OrderForm placeOrder={placeOrder}/>
                    </Col>)}
                </Row>
            </Container>
        </>
    );
};

export default Order;
