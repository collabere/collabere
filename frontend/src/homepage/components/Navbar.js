import React, { Component } from "react";

import { Link, animateScroll as scroll } from "react-scroll";
import * as MaterialUiLibrary from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RegisterModal from "../../register/RegisterModal";
import LoginModal from "../../login/loginModal.js";
import { Link as _Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import MenuIcon from "@material-ui/icons/Menu";
import { Navbar, Form } from "react-bootstrap";
import collabere from "../../../images/collabere.png";
import * as Antd from "antd";

export default class HomeNavBar extends Component {
  scrollToTop = () => {
    scroll.scrollToTop();
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      loginModal: false,
      registerModal: false,
      userName: null
    };

    this.toggle = this.toggle.bind(this);
    this.loginToggle = this.loginToggle.bind(this);
    this.registerToggle = this.registerToggle.bind(this);
  }

  componentDidMount() {
    if (this.props.userName !== null && this.props.userName != undefined) {
      this.setState({ userName: this.props.userName });
    }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  loginToggle() {
    this.setState(prevState => ({
      modal: true,
      loginModal: true,
      registerModal: false
    }));
  }

  registerToggle() {
    this.setState(prevState => ({
      modal: true,
      registerModal: true,
      loginModal: false
    }));
  }

  //  handleLoginClick = () => {
  //     window.location.href = "http://127.0.0.1:8000/influencer/login";
  // }

  //  handleRegisterClick = () => {
  //     window.location.href = "http://127.0.0.1:8000/influencer/register";
  // }

  render() {
    const rootStyle = {
      flexGrow: 1
    };

    const appBarStyle = {
      backgroundColor: "#7e0015",
      height: "63px"
    };

    const typographyStyle = {
      flexGrow: 1,
      fontSize: 50,
      fontStyle: "italic",
      fontWeight: 400,
      fontFamily: "auto",
      paddingLeft: "2rem"
    };

    const toolbarStyle = {
      textAlign: "center"
    };

    const buttonColor = {
      backgroundColor: "#990000",
      color: "white"
    };

    const linkColor = {
      textDecoration: "none"
    };
    console.log("Before client call", localStorage.getItem("username"));

    return (
      <div style={rootStyle}>
        <MaterialUiLibrary.AppBar position="fixed" style={appBarStyle}>
          <MaterialUiLibrary.Toolbar style={toolbarStyle}>
            <MaterialUiLibrary.Typography
              variant="h6"
              color="inherit"
              style={typographyStyle}
            >
              <_Link style={{ textDecoration: "none" }} to="/">
                <img src={collabere} />
              </_Link>
            </MaterialUiLibrary.Typography>
            {localStorage.getItem("token") != null ? (
              <_Link
                to={`/clients/${localStorage.getItem("username")}`}
                style={linkColor}
              >
                INBOX
              </_Link>
            ) : (
              <div>Welcome Guest</div>
            )}
          </MaterialUiLibrary.Toolbar>
        </MaterialUiLibrary.AppBar>
      </div>
    );
  }
}
