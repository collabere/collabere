import React, { Component } from "react";
// import logo from "./logo.svg";
import "./HomePage.css";
import Navbar from "./Navbar";
import Section from "./Section";
import dummyText from "./DummyText";
import FooterComp from "../../footer/FooterComp";
import InfluencerSection from "./InfluencerSection.js";
import BrandSection from "./BrandSection.js";
import HowItWorksSection from "./HowItWorksSection.js";
import AboutUsSection from "./AboutUsSection.js";
class HomePage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <InfluencerSection
          dark={true}
          id="section1"
        />
        <BrandSection
          dark={false}
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

         {/* <Section
          title="MEMBERSHIP"
          subtitle={dummyText}
          dark={true}
          id="section3"
        /> */}
        {/* <AdvantageSection
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
        /> */}
        <FooterComp/>
      </div>
    );
  }
}

export default HomePage;
