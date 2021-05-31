import React from "react";
import "./Cart.css";
import {Col, Row} from "react-bootstrap";

const Cart = ({cartProducts, onAddToCart, onRemoveFromCart, checkout}) => {
  // Calculate total price for all products on the cart
  const itemsPrice = cartProducts.reduce(
    (counter, product) => counter + product.price * product.amount,
    0
  );
  const tax = itemsPrice * 0.2;
  const shipping = itemsPrice > 150 ? 0 : 50;
  const totalPrice = itemsPrice + tax + shipping;

  return (
    <div className="cart-area block">
      <h1 className="text-center">
        {" "}
        {cartProducts.length === 0 ? "Cart is empty" : "Cart Items"}{" "}
      </h1>
      <hr />
      {cartProducts &&
        cartProducts.map((item) => (
          <Row key={item.id}>
            <Col className="col-4 text-break"> item{item.id} </Col>{" "}
            {/*{product.name}*/}
            <Col className="col-4">
              <button
                onClick={() => onAddToCart(item)}
                className="add cart-buttons"
              >
                {" "}
                +
              </button>
              <button
                onClick={() => onRemoveFromCart(item)}
                className="remove cart-buttons"
              >
                {" "}
                -
              </button>
            </Col>
            <Col className="col-4 text-right">
              {item.amount} X ${item.price}
            </Col>
          </Row>
        ))}
      {cartProducts.length !== 0 && (
        <>
          <hr />
          <Row>
            <Col className="col-6 text-break"> Items Price </Col>
            <Col className="col-5 text-end"> ${itemsPrice} </Col>
          </Row>
          <Row>
            <Col className="col-6 text-break"> Tax Price </Col>
            <Col className="col-5 text-end"> ${tax.toFixed(2)} </Col>
          </Row>
          <Row>
            <Col className="col-6 text-break"> Shipping Price </Col>
            <Col className="col-5 text-end"> ${shipping} </Col>
          </Row>
          <Row>
            <Col className="col-6 text-break">
              {" "}
              <strong> Total Price </strong>{" "}
            </Col>
            <Col className="col-5 text-end">
              {" "}
              <strong> ${totalPrice} </strong>{" "}
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <button id="cart-checkout" onClick={checkout}>
                {" "}
                Checkout{" "}
              </button>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Cart;
