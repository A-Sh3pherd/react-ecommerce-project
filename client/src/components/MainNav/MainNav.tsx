import React, {useContext, useEffect, useState} from "react";
import {Col, Container, Form, Nav, Navbar, Row} from "react-bootstrap";
import * as AiIcons from "react-icons/ai";
import {Link} from "react-router-dom";
import {AdminContext} from "../../context/AdminContext";
import {MainNavData} from "./MainNavData";
import logo from '../../imgs/smallLogo.png';
import AddProductModal from "../Modals/AddProductModal/AddProductModal";


const MainNav = ({
                     showCartHandler,
                     cartProducts,
                     getProducts,
                     products,
                     setProducts,
                     showCart,
                     setShowCart
                 }) => {
    const {admin} = useContext(AdminContext);
    const [searchValue, setSearchValue] = useState("");
    // Add Product Modal Handling
    const [show, setShow] = useState(false)


    // Searching Product
    async function setSearch() {
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
            getProducts()
                .then((products) => {
                    setProducts(products);
                    cartProducts.length ? setShowCart(true) : setShowCart(false)
                });
        }
        // search by Print
        products.forEach(
            (product) =>
                product.price === searchTerm && searchedProducts.push(product)
        );
        // products.forEach(product => product.price = searchTerm ? searchedProducts.push(product) : null)
        setProducts(searchedProducts);
    }

    // Add Product
    async function addProduct() {
        console.log('clicked')
    }

    // Everytime searchValue Changes
    useEffect(() => {
        setShowCart(false)
        setSearch();
    }, [searchValue]);

    return (
        <Navbar expand="lg" bg={"light"} variant={"light"}>
            <Container fluid style={{width: "60%"}}>
                {/*  Logo Brand  */}
                <Col className="col-2 d-flex justify-content-center">
                    <Navbar.Brand>
                        <Link to='/' style={{color: 'black'}}>
                            <img
                                src={logo}
                                alt="iPay"
                                style={{width: '100%'}}
                            />
                        </Link>
                    </Navbar.Brand>
                </Col>
                {/* Collapse Navbar */}
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* Search */}
                    <Col className="d-flex justify-content-center">
                        <Form.Control
                            onChange={(e) => setSearchValue(e.target.value)}
                            type="search"
                            placeholder="Search..."
                            style={{
                                width: "30%",
                                height: '80%',
                                fontSize: '0.90rem',
                                borderRadius: '25px',
                                padding: '10px'
                            }}
                        />
                    </Col>
                    {/*  Mapping all Nav Links  */}
                    {MainNavData.map((item, index) => {
                        return (
                            <Col className="col-1" key={index}>
                                <Link
                                    to={item.path}
                                    className={item.className}
                                    style={{
                                        fontSize: "1.15rem",
                                        color: "black",
                                    }}
                                >
                                    <span>{item.icon}</span>
                                </Link>
                            </Col>
                        );
                    })}

                    {/* If not admin, Show cart. */}
                    {!admin ? (
                            <Col className="col-auto">
                                <Nav.Item
                                    className="nav-text cart-badge"
                                    style={{
                                        fontSize: "0.95rem",
                                        textDecoration: "none",
                                        color: "black",
                                    }}
                                    onClick={showCartHandler}
                                >
                                    {/*     Cart Span      */}
                                    <div id="cart-span">
                                        <AiIcons.AiOutlineShoppingCart
                                            size={25}
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
                                                    fontSize: "0.85rem",
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
                        )
                        //    If User is admin
                        : (
                            <>
                                <Col className='col-auto'>
                                    <Nav.Item>
                                        <AiIcons.AiOutlinePlusCircle
                                            size={20}
                                            style={{
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                marginTop: '2px'
                                            }}
                                            onClick={() => setShow(true)}
                                        />
                                    </Nav.Item>
                                </Col>
                                {/* AddProduct Modal */}
                                <AddProductModal show={show} setShow={setShow}/>
                            </>
                        )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MainNav;
