import React, { Component } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { Button } from "antd";
import * as MaterialUiLibrary from "@material-ui/core";
import RegisterModal from "../../register/registerModal";
import LoginModal from '../../login/loginModal';
import { Link as _Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as Antd from "antd";
import LoginService from '../../service/loginService';

export default class Navbar extends Component {
  scrollToTop = () => {
    scroll.scrollToTop();
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      loginModal: false,
      registerModal: false
    }

    this.toggle = this.toggle.bind(this);
    this.loginToggle = this.loginToggle.bind(this);
    this.registerToggle = this.registerToggle.bind(this);
    this.loginCall = this.loginCall.bind(this);
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

  loginCall() {
    console.log('login has been called........');
    let username = document.getElementById('exampleEmail');
    let password = document.getElementById('examplePassword');
    console.log(username, ' ', password);
    let loginService = new LoginService();
    loginService.loginInfluencer(username, password).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  registerToggle() {
    this.setState(prevState => ({
      modal: true,
      registerModal: true,
      loginModal: false,
    }));
  }


  render() {
    return (
      <nav className="nav" id="navbar">
        <div>
          <img src={require('../../collabere.png')} style={{ height: '60px' }} />
        </div>
        <div className="nav-content">

          <ul className="nav-items">
            <li className="nav-item">
              <MaterialUiLibrary.Button style={{ marginTop: '19px', fontSize: '1rem', fontWeight: '600' }}>
                <Link
                  activeClass="active"
                  to="section1"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  PROCESS FLOW
                </Link>
              </MaterialUiLibrary.Button>
            </li>
            <li className="nav-item">
              <MaterialUiLibrary.Button style={{ marginTop: '19px', fontSize: '1rem', fontWeight: '600' }}>
                <Link
                  activeClass="active"
                  to="section2"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  ADVANATGE
                </Link>
              </MaterialUiLibrary.Button>
            </li>
            <li className="nav-item">
              <MaterialUiLibrary.Button style={{ marginTop: '19px', fontSize: '1rem', fontWeight: '600' }}>
                <Link
                  activeClass="active"
                  to="section3"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  MEMBERSHIP
                </Link>
              </MaterialUiLibrary.Button>
            </li>
            <li className="nav-item">
              <MaterialUiLibrary.Button style={{ marginTop: '19px', fontSize: '1rem', fontWeight: '600' }}>
                <Link
                  activeClass="active"
                  to="section4"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  ABOUT US
                </Link>
              </MaterialUiLibrary.Button>
            </li>
            <li className="nav-item">
              <MaterialUiLibrary.Button style={{ marginTop: '19px', fontSize: '1rem', fontWeight: '600' }}>
                <Link
                  activeClass="active"
                  to="section5"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  CONTACT US
                </Link>
              </MaterialUiLibrary.Button>
            </li>
          </ul>
          <div style={{ marginLeft: '150px' }}>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              {this.state.loginModal ?
                <ModalHeader toggle={this.toggle}>Login</ModalHeader> :
                null
              }
              {this.state.registerModal ?
                <ModalHeader toggle={this.toggle}>Register</ModalHeader> :
                null
              }
              <ModalBody>
                {this.state.loginModal ? <LoginModal /> : null}
                {this.state.registerModal ? <RegisterModal /> : null}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.loginCall}>Submit</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
            <button type="button" className="btn btn-lg btn-default" onClick={this.loginToggle}>Login</button>
            <_Link to="/register"><button type="button" className="btn btn-lg btn-default" onClick={this.registerToggle}>Register</button></_Link>
          </div>
        </div>
      </nav>
    );
  }
}
