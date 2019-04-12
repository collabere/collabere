import React from "react";
import { Navbar, Button, FormControl, Nav, Form } from 'react-bootstrap';

export default class HeaderComp extends React.Component {
    render() {
        return (
            <>
                <Navbar className="navbar navbar-default navbar-fixed-top" bg="light" variant="dark" fixedTop>
                    <Navbar.Brand href="#home">Collabere</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar>
            </>
        );
    }
}