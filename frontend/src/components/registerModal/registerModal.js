import React from "react";
import { ModalBody, Col, Form, FormGroup, Label, Input, Button, } from 'reactstrap';

class RegisterModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Form className="form">
                <Col>
                    <FormGroup>
                        <Label>First Name</Label>
                        <Input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="John"
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label>Last Name</Label>
                        <Input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Doe"
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label>User Name</Label>
                        <Input
                            type="text"
                            name="userName"
                            id="userName"
                            placeholder="johnDoe420"
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="johnDoe@gmail.com"
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="examplePassword1"
                            placeholder="********"
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="examplePassword">Re-enter Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="examplePassword2"
                            placeholder="********"
                        />
                    </FormGroup>
                </Col>
            </Form>
        );
    }
}

export default RegisterModal;