import React, {useEffect} from 'react';
import './Cart.css';
import {Col, Row} from "react-bootstrap";

const Cart = ({cartProducts, onAddToCart, onRemoveFromCart, updateCartOnDb}) => {

    useEffect(() => {
        updateCartOnDb(cartProducts)
    },[cartProducts])

    return (
        <div className='cart-area'>
            <h1 className='text-center'> {cartProducts.length === 0 ? 'Cart is empty' : 'Cart Items'} </h1>
            <hr/>
            {cartProducts && cartProducts.map((item) => (
                <Row key={item.id}>
                    <Col className='col-4 text-break'> {item.name} </Col>
                    <Col className='col-4'>
                        <button onClick={() => onAddToCart(item)} className='add cart-buttons'> +</button>
                        <button onClick={() => onRemoveFromCart(item)} className='remove cart-buttons'> -</button>
                    </Col>
                    <Col className='col-4 text-right'>
                        {item.amount} X ${item.price}
                    </Col>
                </Row>
            ))}
        </div>
    );
};

export default Cart;
