import React from "react";
import {Col, Nav, Navbar, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {MainNavData} from "./MainNavData";
import * as AiIcons from "react-icons/ai";

// Styled Nav

const MainNav = ({cartAmount, showCartHandler}) => {
  return (
      <Row className="nav-row">
        <Navbar expand="md" bg={"dark"} variant={"dark"}>
          <Col className="col-4 d-flex justify-content-center">
            <Navbar.Brand href="#home">Market-Project </Navbar.Brand>
          </Col>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {MainNavData.map((item, index) => {
              return (
                <Col className="col-3" key={index}>
                  <Link
                    to={item.path}
                    className={item.className}
                    style={{
                      fontSize: "1.2rem",
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                </Col>
              );
            })}
          </Navbar.Collapse>
          <Col className="col-4 d-flex justify-content-center">
            <Nav.Item
              className="nav-text cart-badge"
              style={{
                fontSize: "1.2rem",
                margin: "15px",
                textDecoration: "none",
                color: "white",
              }}
              onClick={showCartHandler}
            >
              <div id="cart-span">
                <AiIcons.AiOutlineShoppingCart
                  size={40}
                  color="white"
                  style={{marginRight: "5px"}}
                />
                {cartAmount ? <span className="badge">{cartAmount}</span> : ""}
              </div>
            </Nav.Item>
          </Col>
        </Navbar>
      </Row>
  );
};

export default MainNav;
