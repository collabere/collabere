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
import Login from "../socialMedia/login";
import * as MaterialUiLibrary from "@material-ui/core";

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

  handleRegister() {
    console.log("axios called register.s");
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
        const authToken = "Token " + token;
        localStorage.setItem("token", authToken);
        axios.defaults.headers.common["Authorization"] = authToken;
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
      <div>
        <Form className="form">
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
          <MaterialUiLibrary.Button
            variant="contained"
            color="primary"
            onClick={this.handleLogin}
          >
            Login
          </MaterialUiLibrary.Button>
          <Link style={{ textDecoration: "none" }} to="/register">
            {" "}
            <MaterialUiLibrary.Button color="secondary">
              Sign Up
            </MaterialUiLibrary.Button>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/forgot-password">
            {" "}
            <MaterialUiLibrary.Button color="secondary">
              Forgot Password?
            </MaterialUiLibrary.Button>
          </Link>
        </Form>
        <div style={{ paddingTop: "2rem" }}>
          <Login />
        </div>
      </div>
    );
  }
}

export default LoginModal;
