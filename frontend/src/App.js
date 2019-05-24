import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ClientScreen from './influencer/components/ClientScreen.js'
import ConversationScreen from './conversation/components/ConversationScreen.js'
import HomePage from './homepage/components/Homepage.js';
import RegisterModal from './register/RegisterModal';


class App extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={HomePage}></Route>
                <Route path="/clients/:influencerUsername" component={ClientScreen} />
                <Route exact path="/messages/:influencerUsername/:clientId" component={ConversationScreen} />
                <Route exact path="/home" component={HomePage} />
                <Route path="/register" component={RegisterModal}></Route>
            </Router>
        );
    }
}

export default App;
