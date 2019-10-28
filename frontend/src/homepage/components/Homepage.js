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
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import HomeImage from "./HomeImage";

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));


function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function Elevation(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}


Elevation.propTypes = {
  children: PropTypes.element.isRequired
};

export default function HomePage(props) {
    return (
      <div>
        <React.Fragment>
          <CssBaseline />
          <Elevation {...props}>
            <HomeNavBar/>
          </Elevation>
          <Toolbar id="back-to-top-anchor"/>
          <HomeImage/>
          <Container>
            <Box my={2}>
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
            </Box>
          </Container>
          <FooterComp/>
          <ScrollTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
        </React.Fragment>
      </div>
    );
}

