import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {MainNavData} from './MainNavData';
import './MainNav.css';

const MainNav = () => {
    return (
        <Navbar bg="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand>
                    <Link to='/' id='brand' > Shopping Project </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='mr-auto'>
                        {/* Mapping nav data here */}
                        {MainNavData.map((item, index) => {
                            return (
                                <Link
                                    to={item.path}
                                    key={index}
                                    className={item.className}
                                    style={{fontSize: '1.2rem', margin: '20px', textDecoration: 'none', color: 'white'}}
                                >
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            )
                        })}
                        {/*<Link*/}
                        {/*    to='/cart'*/}
                        {/*    style={{fontSize: '1.2rem', margin: '20px', textDecoration: 'none', color: 'white',marginLeft: '50'}}*/}
                        {/*>*/}
                        {/*    {<AiIcons.AiOutlineShoppingCart />} Cart*/}
                        {/*</Link>*/}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MainNav;

