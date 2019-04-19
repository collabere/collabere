import React, { Component } from "react";
import './HomePage.css';
import LoginModal from '../../loginModal/loginModal';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import RegisterModal from "../../registerModal/registerModal";
import { Link } from 'react-router-dom';


class HomePage extends Component {
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
            loginModal: false,
        }));
    }

    render() {
        return (
            <div className="site-wrapper">
                <div className="site-wrapper-inner">
                    <div className="container">
                        <div className="masthead clearfix">
                            <div className="container inner">
                                <h3 className="masthead-brand">Collabere</h3>
                                <nav>
                                    <ul className="nav masthead-nav">
                                        <li className="active"><a href="#">Home</a></li>
                                        <li><a href="#">Features</a></li>
                                        <li><a href="#">Contact</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className="inner cover">
                            <h1 className="cover-heading">Collabere</h1>
                            <p className="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
                            <p className="lead">
                                <a href="#" className="btn btn-lg btn-default">Learn more</a>
                            </p>
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
                                    <Button color="primary" onClick={this.toggle}>Submit</Button>{' '}
                                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                            <button type="button" className="btn btn-lg btn-default" onClick={this.loginToggle}>Login</button>
                            <Link to="/register"><button type="button" className="btn btn-lg btn-default" onClick={this.registerToggle}>Register</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default HomePage;