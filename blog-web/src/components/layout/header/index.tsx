import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.scss'
const Header: React.FC = () => {
    return (
        <div className='wrapper'>
            <Navbar bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="#home">
                        <img
                            src={"https://zigvy.com/wp-content/uploads/2017/12/zigvy-logo.svg"}
                            width="50"
                            height="50"
                            className="d-inline-block align-top"
                            alt="Logo"
                        />{' '}

                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Blog</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="#pricing">other</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
