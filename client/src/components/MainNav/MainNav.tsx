import React, {useContext} from "react";
import {Col, Nav, Navbar, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {MainNavData} from "./MainNavData";
import * as AiIcons from "react-icons/ai";
import {AdminContext} from "../../context/AdminContext";

// Styled Nav
const MainNav = ({cartAmount, showCartHandler}) => {
  const {admin} = useContext(AdminContext);

  return (
    <Row className="nav-row">
      <Navbar expand="md" bg={"light"} variant={"light"}>
        <Col className="col-4 d-flex justify-content-center">
          <Navbar.Brand href="#home"> Market-Project </Navbar.Brand>
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
                    fontSize: "1rem",
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  {item.icon}
                  {item.title}
                </Link>
              </Col>
            );
          })}
        </Navbar.Collapse>

        {/* If not admin, Show cart. */}
        {!admin && (
          <Col className="col-4 d-flex justify-content-center">
            <Nav.Item
              className="nav-text cart-badge"
              style={{
                fontSize: "1rem",
                margin: "15px",
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
                {cartAmount ? (
                  <span
                    className="badge"
                    style={{background: "red", opacity: "0.7"}}
                  >
                    {cartAmount}
                  </span>
                ) : (
                  <span style={{fontSize: "0.80rem", cursor: "pointer"}}>
                    {" "}
                    {"Cart is empty."}
                  </span>
                )}
              </div>
            </Nav.Item>
          </Col>
        )}
      </Navbar>
    </Row>
  );
};

export default MainNav;
