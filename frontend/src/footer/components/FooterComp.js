import React from "react";
import { Link, Redirect } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  AppBar
} from "@material-ui/core";
import AccountBalance from "@material-ui/icons/AccountBalance";
import Class from "@material-ui/icons/Class";
import PolicyIcon from "@material-ui/icons/Policy";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

export default class FooterComp extends React.Component {
  test = () => {
    return <Redirect to="/dashboard" />;
  };
  render() {
    const footerStyle = {
      backgroundColor: "#F9F9F9"
    };
    return (
      <BottomNavigation showLabels style={footerStyle}>
        <BottomNavigationAction
          label="About"
          value="About"
          showLabel={true}
          icon={<AccountBalance />}
        />
        <Link to="terms-conditions" style={{ textDecoration: "none" }}>
          <BottomNavigationAction
            label="Terms and Conditions"
            value="Terms And Conditions"
            showLabel={true}
            icon={<Class />}
          />
        </Link>
        <Link to="terms-conditions" style={{ textDecoration: "none" }}>
          <BottomNavigationAction
            label="Privacy Policy"
            value="Privacy Policy"
            showLabel={true}
            icon={<PolicyIcon />}
          />
        </Link>
        <BottomNavigationAction
          label="Pricing"
          value="Pricing"
          icon={<MonetizationOnIcon />}
        />
      </BottomNavigation>
    );
  }
}
