import React from "react";
import {
  ModalBody,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      authenticatedUsername: null
    };
    this.handleChangeOfInputFields = this.handleChangeOfInputFields.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    axios({
      method: "post",
      url: `/api/login`,
      data: {
        username: this.state.username,
        password: this.state.password
      },
      headers: {
        "content-type": "application/json"
      }
    }).then(response => {
      const { token, username } = response.data;
      if (token) {
        axios.defaults.headers.common["Authorization"] = 'Token '+ token;
        this.setState({ authenticatedUsername: username });
      } else {
        axios.defaults.headers.common["Authorization"] = null;
      }
    });
  }

  handleChangeOfInputFields(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { authenticatedUsername } = this.state;
    if (authenticatedUsername) {
      return <Redirect to={`/clients/${this.state.username}`} />;
    }
    return (
      <Form className="form">
        <Col>
          <FormGroup>
            <Label>User Name</Label>
            <Input
              type="text"
              name="username"
              id="exampleEmail"
              placeholder="myemail@email.com"
              onChange={this.handleChangeOfInputFields}
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
              onChange={this.handleChangeOfInputFields}
            />
          </FormGroup>
        </Col>
        <Button onClick={this.handleLogin}>Login</Button>
      </Form>
    );
  }
}

export default LoginModal;
