import React, { Component } from "react";

import { Link, animateScroll as scroll } from "react-scroll";
import * as MaterialUiLibrary from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import RegisterModal from "../../register/RegisterModal";
import LoginModal from "../../login/loginModal.js";
import { Link as _Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import MenuIcon from '@material-ui/icons/Menu';
import {
  Navbar,
  Form,
} from "react-bootstrap";
import collabere from '../../../images/collabere.png'
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
      registerModal: false
    };

    this.toggle = this.toggle.bind(this);
    this.loginToggle = this.loginToggle.bind(this);
    this.registerToggle = this.registerToggle.bind(this);
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
      flexGrow: 1,
    }

    const appBarStyle = {
      backgroundColor: '#7e0015',
      height: '63px',
    }

    const typographyStyle = {
      flexGrow: 1,
      fontSize: 50,
      fontStyle: 'italic',
      fontWeight: 400,
      fontFamily: 'auto',
    }

    const toolbarStyle = {
      textAlign: 'center'
    }

    return (
      <div style={rootStyle}>
          <MaterialUiLibrary.AppBar position="fixed" style={appBarStyle}>
            <MaterialUiLibrary.Toolbar style={toolbarStyle}>
              <MaterialUiLibrary.Typography variant="h6" color="inherit" style={typographyStyle}>
                <img src={collabere}/>
              </MaterialUiLibrary.Typography>
              {/* <MaterialUiLibrary.Button color="inherit">Influencers</MaterialUiLibrary.Button>
              <MaterialUiLibrary.Button color="inherit">Brands</MaterialUiLibrary.Button>
              <MaterialUiLibrary.Button color="inherit">How It Works</MaterialUiLibrary.Button>
              <MaterialUiLibrary.Button color="inherit">About Us</MaterialUiLibrary.Button>
              <MaterialUiLibrary.Button color="inherit">Login</MaterialUiLibrary.Button>
              <MaterialUiLibrary.Button color="inherit">Register</MaterialUiLibrary.Button> */}
            </MaterialUiLibrary.Toolbar>
          </MaterialUiLibrary.AppBar>
      </div>
      // <Navbar expand="lg" style={{backgroundColor: '#7e0015'}}>
      //   <Navbar.Brand href="#home"><img src={collabere}></img></Navbar.Brand>
      //   <Navbar.Toggle style={{borderColor: 'white'}}><MenuIcon style={{color: 'white'}} /></Navbar.Toggle> 
      //   <Navbar.Collapse id="basic-navbar-nav" style={{marginLeft: '90px'}}>
      //     <Form inline >
      //       <MaterialUiLibrary.Button
      //         style={{  paddingLeft:'40px',fontSize: "1rem", fontWeight: "600", color: '#ffffff' }}
      //       >
      //         <Link
      //           activeClass="active"
      //           to="section1"
      //           spy={true}
      //           smooth={true}
      //           offset={-70}
      //           duration={500}
      //         >
      //           Influencers
      //         </Link>
      //       </MaterialUiLibrary.Button>
      //       <MaterialUiLibrary.Button style={{ paddingLeft:'40px',fontSize: '1rem', fontWeight: '600', color: '#ffffff' }}>
      //           <Link
      //             activeClass="active"
      //             to="section2"
      //             spy={true}
      //             smooth={true}
      //             offset={-70}
      //             duration={500}
      //           >
      //             Brands
      //           </Link>
      //         </MaterialUiLibrary.Button>
      //         <MaterialUiLibrary.Button style={{  paddingLeft:'40px',fontSize: '1rem', fontWeight: '600', color: '#ffffff' }}>
      //            <Link
      //             activeClass="active"
      //             to="section3"
      //             spy={true}
      //             smooth={true}
      //             offset={-70}
      //             duration={500}
      //           >
      //            How it Works
      //           </Link>
      //         </MaterialUiLibrary.Button>
      //         <MaterialUiLibrary.Button style={{ paddingLeft:'40px', fontSize: '1rem', fontWeight: '600', color: '#ffffff' }}>
      //            <Link
      //             activeClass="active"
      //             to="section4"
      //             spy={true}
      //             smooth={true}
      //             offset={-70}
      //             duration={500}
      //           >
      //            About Us
      //           </Link>
      //         </MaterialUiLibrary.Button>
      //         <Form inline style={{marginLeft: '90px'}} >
      //         <Modal
      //           isOpen={this.state.modal}
      //           toggle={this.toggle}
      //           className={this.props.className}
      //           style={{width: '100'}}
      //         >
      //           {this.state.loginModal ? (
      //             <ModalHeader toggle={this.toggle}>Login</ModalHeader>
      //           ) : null}
      //           {this.state.registerModal ? (
      //             <ModalHeader toggle={this.toggle}>Register</ModalHeader>
      //           ) : null}
      //           <ModalBody>
      //             {this.state.loginModal ? <LoginModal /> : null}
      //             {this.state.registerModal ? <RegisterModal /> : null}
      //           </ModalBody>
      //         </Modal>
      //         <MaterialUiLibrary.Button
      //           variant="contained"
      //           color="primary"
      //           onClick={this.loginToggle}
      //         >
      //           Login
      //         </MaterialUiLibrary.Button>
      //         <_Link to="/register">
      //           <MaterialUiLibrary.Button
      //             variant="contained"
      //             color="primary"
      //             onClick={this.registerToggle}
      //           >
      //             Register
      //           </MaterialUiLibrary.Button>
      //         </_Link>
      //      </Form>
      //     </Form>
      //   </Navbar.Collapse>
      // </Navbar>
    );
  }
}

