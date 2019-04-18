import React, { Component } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { Button } from "antd";
import * as MaterialUiLibrary from "@material-ui/core";
import * as Antd from "antd";

export default class Navbar extends Component {
  scrollToTop = () => {
    scroll.scrollToTop();
  };

 handleLoginClick = () => {
    window.location.href = "http://127.0.0.1:8000/influencer/login";
}

 handleRegisterClick = () => {
    window.location.href = "http://127.0.0.1:8000/influencer/register";
}

  render() {
    return (
      <nav className="nav" id="navbar">
       <div>
          <img src={require('../../collabere.png')} style ={{height: '60px'}} />
          </div>
        <div className="nav-content">
         
          <ul className="nav-items">
            <li className="nav-item">
              <MaterialUiLibrary.Button style ={{marginTop: '19px', fontSize: '1rem', fontWeight: '600'}}>
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
              <MaterialUiLibrary.Button style ={{marginTop: '19px', fontSize: '1rem', fontWeight: '600'}}>
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
              <MaterialUiLibrary.Button style ={{marginTop: '19px', fontSize: '1rem', fontWeight: '600'}}>
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
              <MaterialUiLibrary.Button style ={{marginTop: '19px', fontSize: '1rem', fontWeight: '600'}}>
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
              <MaterialUiLibrary.Button style ={{marginTop: '19px', fontSize: '1rem', fontWeight: '600'}}>
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
          <div style={{marginLeft:'150px'}}>
          <Button type="primary" onClick={this.handleLoginClick} style={{backgroundColor: '#ffffff', color: '#000000'}}>Login</Button>
          <Button style={{marginLeft: '20px', backgroundColor: '#3b5998'}} type="primary" onClick={this.handleRegisterClick}>Register</Button>
          </div>
        </div>
      </nav>
    );
  }
}
