import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePageList from './homepage/containers/HomepageList';
import LoginModal from "../components/loginModal/loginModal";
import RegisterModal from "../components/registerModal/registerModal";


class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <HomePageList></HomePageList>
      // </div>
      <Router>
          <Route exact path="/" component={HomePageListComponent}></Route>
          <Route path="/home" component={HomePageListComponent}></Route>
          <Route path="/login" component={LoginComponent}></Route>
          <Route path="/register" component={RegisterComponent}></Route>
      </Router>
    );
  }
}

function HomePageListComponent() {
  return <HomePageList></HomePageList>
}

function LoginComponent() {
  return <LoginModal></LoginModal>
}

function RegisterComponent() {
  return <RegisterModal></RegisterModal>
}

export default App;
