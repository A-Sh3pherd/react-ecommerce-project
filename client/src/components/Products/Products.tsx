import React, {useContext, useEffect} from "react";
import {Card, Col, Row} from "react-bootstrap";
import IProduct from "./Products.model";
import "./Products.css";
import {StyledProduct} from "./styles/StyledProduct";
import {AdminContext} from "../../context/AdminContext";

const Products = ({
  products,
  setProducts,
  pickedCategory,
  getProducts,
  onAddToCart,
}) => {
  const {admin} = useContext(AdminContext);

  // productChangeHandler
  function productChangeHandler() {
    console.log("change product");
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
    <StyledProduct>
      <Row id="products-main-row">
        {products &&
          products.map((product: IProduct) => (
            <Col key={product.id}>
              <Card style={{width: "16rem"}} className="product-card">
                <Card.Img
                  variant="top"
                  style={{height: "300px"}}
                  src={product.image_url}
                />
                <Card.Body>
                  <Card.Header> {product.name} </Card.Header>
                  <Card.Footer>
                    <span className="product-price">{product.price} $</span>
                  </Card.Footer>
                </Card.Body>
                <button
                  className="add-to-cart-button"
                  type="button"
                  onClick={
                    !admin
                      ? () => onAddToCart(product)
                      : () => productChangeHandler()
                  }
                >
                  {!admin ? "Add To Cart" : "Change Products"}
                </button>
              </Card>
            </Col>
          ))}
      </Row>
    </StyledProduct>
  );
};

export default Products;
