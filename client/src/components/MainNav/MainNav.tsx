import React, {useContext, useEffect, useState} from "react";
import {Col, Container, Form, Nav, Navbar, Row} from "react-bootstrap";
import * as AiIcons from "react-icons/ai";
import {Link} from "react-router-dom";
import {AdminContext} from "../../context/AdminContext";
import {MainNavData} from "./MainNavData";

// Styled Nav
const MainNav = ({
  showCartHandler,
  cartProducts,
  getProducts,
  products,
  setProducts,
}) => {
  const {admin} = useContext(AdminContext);
  const [searchValue, setSearchValue] = useState("");

  async function setSearch() {
    //Todo: Make sure that when doing like during search, it won't pull all products.
    const searchTerm = searchValue.toLowerCase();
    let searchedProducts = [];
    // search by DATE
    products.forEach(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) &&
        searchedProducts.push(product)
    );
    // Making sure that if search is empty, we fetch the data again!
    if (!searchValue) {
      getProducts().then((products) => setProducts(products));
    }
    // search by Prict
    products.forEach(
      (product) =>
        product.price === searchTerm && searchedProducts.push(product)
    );
    // products.forEach(product => product.price = searchTerm ? searchedProducts.push(product) : null)
    setProducts(searchedProducts);
  }

  useEffect(() => {
    setSearch();
  }, [searchValue]);

  return (
    <Row className="nav-row">
      <Navbar expand="md" bg={"light"} variant={"light"}>
        <Container fluid style={{width: "60%"}}>
          <Col className="col-2 d-flex justify-content-center">
            <Navbar.Brand href="#home"> Market-Project </Navbar.Brand>
          </Col>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Search */}
            <Col className="d-flex justify-content-center">
              <Form.Control
                onChange={(e) => setSearchValue(e.target.value)}
                type="search"
                placeholder="Search..."
                style={{
                  width: "50%",
                }}
              />
            </Col>
            {MainNavData.map((item, index) => {
              return (
                <Col className="col-1" key={index}>
                  <Link
                    to={item.path}
                    className={item.className}
                    style={{
                      fontSize: "24px",
                      color: "black",
                    }}
                  >
                    <span>{item.icon}</span>
                  </Link>
                </Col>
              );
            })}
            {/* If not admin, Show cart. */}
            {!admin && (
              <Col className="col-auto">
                <Nav.Item
                  className="nav-text cart-badge"
                  style={{
                    fontSize: "24px",
                    textDecoration: "none",
                    color: "black",
                  }}
                  onClick={showCartHandler}
                >
                  <div id="cart-span">
                    <AiIcons.AiOutlineShoppingCart
                      size={30}
                      color="red"
                      style={{cursor: "pointer"}}
                    />
                    {cartProducts.length > 0 ? (
                      <span
                        className="badge"
                        style={{
                          background: "red",
                          opacity: "0.7",
                          borderRadius: "30px",
                          fontSize: "16px",
                        }}
                      >
                        {cartProducts.length}
                      </span>
                    ) : (
                      <span style={{fontSize: "0.60rem", cursor: "pointer"}}>
                        {" "}
                        {"Cart is empty."}
                      </span>
                    )}
                  </div>
                </Nav.Item>
              </Col>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Row>
  );
};

export default MainNav;
