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
import Login from '../socialMedia/login';
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
    console.log('axios called register.s')
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
        const authToken='Token '+ token;
        sessionStorage.setItem('token', authToken)
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

    const cardStyle = {
      height: '350px',
      width: '500px',
    }

    const divStyle ={
      height: '350px',
      width: '500px',
      textAlign: '-webkit-center',
    }

    return (
      <div style={divStyle}>
        <MaterialUiLibrary.Card style={cardStyle}>
          <MaterialUiLibrary.CardContent>
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
              <MaterialUiLibrary.Button variant="contained" color="primary" onClick={this.handleLogin}>Login</MaterialUiLibrary.Button>
              <MaterialUiLibrary.Button variant="contained" color="primary" onClick={this.handleRegister}>Register</MaterialUiLibrary.Button>
              <Link style={{textDecoration: 'none'}} to='/forgot-password'> <MaterialUiLibrary.Button  color="secondary">Forgot Password?</MaterialUiLibrary.Button></Link>
              <Login/>
            </Form>
          </MaterialUiLibrary.CardContent>
        </MaterialUiLibrary.Card>
      </div>
    );
  }
}

export default LoginModal;
