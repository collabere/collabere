import React, { Component } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { Button } from "antd";

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
        <div className="nav-content">
          <img src={require('../../collabereLogo.jpeg')} />
          <ul className="nav-items">
            <li className="nav-item">
              <Button>
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
              </Button>
            </li>
            <li className="nav-item">
              <Button>
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
              </Button>
            </li>
            <li className="nav-item">
              <Button>
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
              </Button>
            </li>
            <li className="nav-item">
              <Button>
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
              </Button>
            </li>
            <li className="nav-item">
              <Button>
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
              </Button>
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
