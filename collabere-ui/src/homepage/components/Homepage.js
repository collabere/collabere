import React from "react";
import './HomePage.css';


const HomePage = props => {

    let handleLoginClick = (e) => {
        window.location.href = "http://127.0.0.1:8000/influencer/login";
    }

    let handleRegisterClick = (e) => {
        window.location.href = "http://127.0.0.1:8000/influencer/register";
    }

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
                        <p>
                            <a href="#" className="btn btn-lg btn-default" onClick={handleLoginClick}>Login</a>
                            <a href="#" className="btn btn-lg btn-default" onClick={handleRegisterClick}>Register</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;