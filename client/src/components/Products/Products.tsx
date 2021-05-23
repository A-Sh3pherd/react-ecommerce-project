import React, {useEffect} from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import './Products.css';
import IProduct from './Products.model';

const Products = ({products, setProducts, pickedCategory, getProducts, onAddToCart}) => {
    // Onload- Get all products
    useEffect(() => {
        getProducts()
            .then(products => setProducts(products))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        setProducts(pickedCategory)
    }, [pickedCategory])


    return (
            <Row id='products-main-row'>
                {products && products.map((product: IProduct) => (
                    <Col key={product.id}>
                        <Card style={{width: '18rem'}} className='product-card'>
                            <Card.Img variant="top" style={{height: '400px'}} src={product.image_url}/>
                            <Card.Body>
                                <Card.Header> {product.name} </Card.Header>
                                <Card.Footer>
                                    <span className="product-price">
                                        {product.price} $
                                    </span>
                                </Card.Footer>
                            </Card.Body>
                            <button
                                className='add-to-cart-button'
                                type='button'
                                onClick={() => onAddToCart(product)}>Add To Cart</button>
                        </Card>
                    </Col>
                ))}
            </Row>
    );
};

export default Products;
