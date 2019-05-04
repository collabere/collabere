import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom/Router';
import Route from 'react-router-dom/Route';
import ClientScreen from './influencer/components/ClientScreen.js'
import ConversationScreen from './conversation/components/ConversationScreen.js'
import HomePage from './homepage/components/Homepage.js';
import LoginModal from './login/loginModal';
import RegisterModal from './register/registerModal';


class App extends Component {
    render() {
        return (
            // <div className="App">
            //   <HomePageList></HomePageList>
            // </div>
            <Router>
                <Route exact path="/" component={HomePage}></Route>
                <Route exact path="/clients/" component={ClientScreen} />
                <Route exact path="/messages" component={ConversationScreen} />
                <Route exact path="/home" component={HomePage} />
                <Route path="/login" component={LoginModal}></Route>
                <Route path="/register" component={RegisterModal}></Route>
            </Router>
        );
    }
}

export default App;
