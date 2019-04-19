import React, { Component } from "react";
// import logo from "./logo.svg";
import "./HomePage.css";
import Navbar from "./Navbar";
import Section from "./Section";
import dummyText from "./DummyText";
import FooterComp from "../../footer/FooterComp";
import AdvantageSection from './Advatnage-section';
class HomePage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Section
          title="PROCESS FLOW"
          subtitle={dummyText}
          dark={true}
          id="section1"
        />
        <AdvantageSection
          title="ADVANTAGE"
          subtitle={dummyText}
          dark={false}
          id="section2"
        />
        <Section
          title="MEMBERSHIP"
          subtitle={dummyText}
          dark={true}
          id="section3"
        />
        <Section
          title="ABOUT US"
          subtitle={dummyText}
          dark={false}
          id="section4"
        />
        <Section
          title="CONTACT US"
          subtitle={dummyText}
          dark={true}
          id="section5"
        />
        <FooterComp/>
      </div>
    );
  }
}

export default HomePage;
