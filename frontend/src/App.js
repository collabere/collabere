import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ClientScreen from './influencer/components/ClientScreen.js'
import ConversationScreen from './conversation/components/ConversationScreen.js'
import HomePage from './homepage/components/Homepage.js';
import RegisterModal from './register/RegisterModal';
import Pricing from './footer/components/Pricing';
import TermsAndConditions from './footer/components/Terms-conditions';
import PrivacyPolicy from './footer/components/Privacy-policy';
import ProjectCreationScreen from './project/components/ProjectCreationScreen.js';



class App extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={HomePage}></Route>
                <Route path="/clients/:influencerUsername" component={ClientScreen} />
                <Route exact path="/messages/:influencerUsername/:clientId" component={ConversationScreen} />
                <Route exact path="/home" component={HomePage} />
                <Route path="/register" component={RegisterModal}></Route>
                <Route path="/privacy-policy" component = {PrivacyPolicy}></Route>
                <Route path="/terms-conditions" component = {TermsAndConditions}></Route>
                <Route path="/pricing" component = {Pricing}></Route>
                <Route path="/project/:influencerUsername" component={ProjectCreationScreen}></Route>


            </Router>
        );
    }
}

export default App;
