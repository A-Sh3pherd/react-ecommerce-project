import React, {useContext, useEffect} from "react";
import {Card, Col, Row} from "react-bootstrap";
import {AdminContext} from "../../context/AdminContext";
import {StyledProduct} from "./styles/StyledProduct";
import IProduct from "./Products.model";

const Products = ({
                      products,
                      setProducts,
                      pickedCategory,
                      getProducts,
                      onAddToCart,
                      setShow,
                      setChangedProduct,
                      showCart,
                      setShowCart,
                  }) => {
    const {admin} = useContext(AdminContext);

    // productChangeHandler
    async function productChangeHandler(product) {
        console.log(`change product ${product.id}`);
        setChangedProduct({
            id: product.id,
            name: product.name,
            image_url: product.image_url,
            price: product.price,
            categoryName: product.category.name,
            category: product.category.id,
        });
        setShow(true);
    }

    // Onload- Get all products
    useEffect(() => {
        getProducts()
            .then((products) => setProducts(products))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        setProducts(pickedCategory);
    }, [pickedCategory, setProducts]);

    return (
        <Row>
            {products &&
            products.map((product: IProduct) => (
                <Col
                    className={showCart
                        ? 'col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12' // If True
                        : 'col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12' // If False
                    }
                    key={product.id}>
                    <StyledProduct>
                        <Card style={{width: "14rem"}} className="product-card">
                            <Card.Img
                                variant="top"
                                style={{height: "167px", padding: '20px'}}
                                src={product.image_url}
                            />
                            <Card.Header className='mt-3'>
                                <h5>{product.name}</h5>
                            </Card.Header>
                            <Card.Footer>
                                <span className="product-price">{product.price} $</span>
                            </Card.Footer>
                            <button
                                className="add-to-cart-button"
                                type="button"
                                onClick={
                                    !admin
                                        ? () => onAddToCart(product)
                                        : () => productChangeHandler(product)
                                }
                            >
                                {!admin ? "Add To Cart" : "Change Products"}
                            </button>
                        </Card>
                    </StyledProduct>
                </Col>
            ))}
        </Row>
    );
};

export default Products;
