import React, {useContext, useEffect, useState} from "react";
import "./Order.css";
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import CheckoutCart from "../../components/CheckoutCart/CheckoutCart";
import OrderForm from "../../components/OrderForm/OrderForm";
import MainNav from "../../components/MainNav/MainNav";
import {useHistory} from "react-router-dom";

const Order = () => {
  const [cart, setCart] = useState({id: 0, products: []});
  const [showCart, setShowCart] = useState(true);
  const history = useHistory();

  const itemsPrice = cart.products.reduce(
    (a, product) => a + product.price * product.amount,
    0
  );
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
      console.log(data.oldCart);
      if (data.oldCart.cartProducts.length === 0) history.push("/");
      return data.oldCart;
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
      alert("Fuck Yes! order has being placed !!!!!");
      history.push("/");
    } else {
      alert("Something went wrong...");
    }
  };

  // Get cart onInit
  useEffect(() => {
    getCart().then((cartP) => {
      setCart({
        id: cartP.id,
        products: cartP.cartProducts.map((prod) => ({
          ...prod.product,
          amount: prod.amount,
          total_price: prod.total_price,
        })),
      });
    });
  }, []);

  return (
    <>
      <>
        <MainNav
          cartAmount={cart.products.length}
          showCartHandler={showCartHandler}
        />
      </>

      {/*   CheckoutCart   */}
      <Container>
        <Row>
          <Col className="col-6">
            {showCart && (
              <CheckoutCart
                cart={cart}
                itemsPrice={itemsPrice}
                tax={tax}
                shipping={shipping}
                totalPrice={totalPrice}
              />
            )}
          </Col>

          {/*   Order Form   */}
          <Col className="col-6">
            <OrderForm placeOrder={placeOrder} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Order;
