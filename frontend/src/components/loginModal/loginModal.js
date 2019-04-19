import React from "react";
import { ModalBody, Col, Form, FormGroup, Label, Input, Button, } from 'reactstrap';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Form className="form">
        <Col>
          <FormGroup>
            <Label>User Name or Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="myemail@email.com"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="********"
            />
          </FormGroup>
        </Col>
      </Form>
    );
  }
}

export default LoginModal;