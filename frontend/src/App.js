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
import EmailInputForReset from './login/EmailInputForForgotPassword';
import ForgotPasswordComponent from './login/ForgotPasswordComponent';
import InfluencerProfileScreen from './influencerProfile/components/InfluencerProfileScreen.js';




class App extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={HomePage}></Route>
                <Route path="/clients/:influencerUsername" component={ClientScreen} />
                <Route exact path="/messages/:influencerUsername/:clientId/:projectInitiationDate" component={ConversationScreen} />
                <Route exact path="/home" component={HomePage} />
                <Route path="/register" component={RegisterModal}></Route>
                <Route path="/privacy-policy" component = {PrivacyPolicy}></Route>
                <Route path="/terms-conditions" component = {TermsAndConditions}></Route>
                <Route path="/pricing" component = {Pricing}></Route>
                <Route path="/forgot-password" component={EmailInputForReset}></Route>
                <Route path="/change-password/:influencerUsername/:token" component={ForgotPasswordComponent}></Route>
                <Route path="/profile/:influencerUsername" component={InfluencerProfileScreen}></Route>

            </Router>
        );
    }
}

export default App;
