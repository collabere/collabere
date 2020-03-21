import React, { Fragment } from "react";
import { Button } from "reactstrap";
import InstagramLogin from "react-instagram-login";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.redirectToInstagram = this.redirectToInstagram.bind(this);
    this.state = { isAuthenticated: false, user: null, token: "" };
  }

  instagramResponse = response => {
    console.log("Instagram response called....");
    const data = {
      client_id: "49f4a71ef28b448a864a7519a197ba0c",
      client_secret: "db912bb77fd5472895e8e097191bb1a7",
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:8000/api/social_redirect",
      code: response
    };
    axios
      .post({
        method: "post",
        url: "https://api.instagram.com/oauth/access_token",
        data: data
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log("error", err);
      });
  };

  onFailure = e => {
    alert(e);
  };

  onClick() {
    console.log("Onclick Pressed");
  }

  redirectToInstagram() {
    console.log("Redirecting to instagram custom button ...");
    window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=49f4a71ef28b448a864a7519a197ba0c&redirect_uri=http://localhost:8000/api/social_redirect&scope=basic&response_type=code`;
  }

  render() {
    return (
      <Fragment>
        {/* <InstagramLogin
          clientId="49f4a71ef28b448a864a7519a197ba0c"
          buttonText="Login With Instagram"
          redirectUri="http://localhost:8000/api/social_redirect"
          onClick={this.onClick}
          onSuccess={this.instagramResponse}
          onFailure={this.instagramResponse}
        /> */}

        <Button onClick={this.redirectToInstagram}>Login with Instagram</Button>

      </Fragment>
    );
  }
}

export default Login;
