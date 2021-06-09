import React, {useContext, useEffect} from "react";
import {Card, Col, Row} from "react-bootstrap";
import {AdminContext} from "../../context/AdminContext";
import "./Products.css";
import IProduct from "./Products.model";
import {StyledProduct} from "./styles/StyledProduct";

const Products = ({
  products,
  setProducts,
  pickedCategory,
  getProducts,
  onAddToCart,
  setShow,
  setChangedProduct,
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
    <StyledProduct>
      <Row id="products-main-row">
        {products &&
          products.map((product: IProduct) => (
            <Col key={product.id}>
              <Card style={{width: "14rem"}} className="product-card">
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
                      : () => productChangeHandler(product)
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
