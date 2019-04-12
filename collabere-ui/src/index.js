import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ClientScreen from './influencer/components/ClientScreen.js'
import ConversationScreen from './conversation/components/ConversationScreen.js'
import HomePage from './homepage/components/Homepage.js';


ReactDOM.render(
  


<Router>
      <div>   
        <Route exact path="/clients/" component={ClientScreen} />
        <Route exact path="/messages" component={ConversationScreen} />
        <Route exact path="/home" component={HomePage} />
      </div>
</Router>,


document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
