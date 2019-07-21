import React, { Component } from "react";
// import logo from "./logo.svg";
import "./HomePage.css";
import Section from "./Section";
import dummyText from "./DummyText";
import FooterComp from "../../footer/components/FooterComp";
import InfluencerSection from "./InfluencerSection.js";
import BrandSection from "./BrandSection";
import HowItWorksSection from "./HowItWorksSection.js";
import AboutUsSection from "./AboutUsSection.js";
import HomeNavBar from "./Navbar";
class HomePage extends Component {
  render() {
    return (
      <div>
        <HomeNavBar />
        <InfluencerSection
          dark={true}
          id="section1"
        />
        <BrandSection
          id="section2"
        />
         <HowItWorksSection
          dark={false}
          id="section3"
        />
         <AboutUsSection
          dark={false}
          id="section4"
        />
        <FooterComp/>
      </div>
    );
  }
}

export default HomePage;
