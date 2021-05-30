import React from 'react';
import {Col, Row} from "react-bootstrap";
import './CheckoutCart.css';

const CheckoutCart = ({cart, itemsPrice, tax, shipping, totalPrice}) => {


    return (
        <div className='template'>
            <>
                <h1 className='text-center'> {cart.length === 0 ? 'Cart is empty' : 'Cart Items'} </h1>
                <hr/>
                {cart && cart.products.map((item) => (
                    <Row key={item.id} className='mb-2'>
                        <Col className='col-4 mt-4'> item{item.id} </Col> {/*{product.name}*/}

                        <Col className='col-4'>
                            <img
                                src={item.image_url} alt={item.id}
                                className='cart-images'
                            />
                        </Col>

                        <Col className='col-4 text-end mt-4'>
                            {item.amount} X ${item.price}
                        </Col>
                    </Row>
                ))}
            </>
            <hr/>
            <div className='prices-area'>
                <Row>
                    <Col className='col-6 text-break'> Items Price </Col>
                    <Col className='col-6 text-end'> ${itemsPrice} </Col>
                </Row>
                <Row>
                    <Col className='col-6 text-break'> Tax Price </Col>
                    <Col className='col-6 text-end'> ${tax.toFixed(2)} </Col>
                </Row>
                <Row>
                    <Col className='col-6 text-break'> Shipping Price </Col>
                    <Col className='col-6 text-end'> ${shipping} </Col>
                </Row>
                <Row>
                    <Col className='col-6 text-break'> <strong> Total Price </strong> </Col>
                    <Col className='col-6 text-end'> <strong> ${totalPrice} </strong> </Col>
                </Row>
                <hr/>
            </div>
        </div>
    );
};

export default CheckoutCart;