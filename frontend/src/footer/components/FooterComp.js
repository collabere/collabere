import React from "react";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import AccountBalance from '@material-ui/icons/AccountBalance';
import Class from '@material-ui/icons/Class';
import PolicyIcon from '@material-ui/icons/Policy';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

export default class FooterComp extends React.Component {
  render() {
    const footerStyle = {
      backgroundColor: '#F9F9F9'
    }
    return (
      // <div  style={{margin: "auto" }}>
      //   <nav
      //     class="navbar navbar-light"
      //     style={{ backgroundColor: "#696969", height: "150px" }}
      //   >
      //     <form inline>
      //       <div>
      //         <Link  style={{textDecoration: 'none'}} to='/terms-conditions'><Button style ={{fontSize: '18px' }}>Terms and conditions</Button></Link>
      //       </div>
      //       <div  >
      //       <Link  style={{textDecoration: 'none'}} to='/privacy-policy'> <Button style ={{fontSize: '18px' }}>Privacy policy</Button></Link>
      //       </div>
      //       <div  >
      //       <Link style={{textDecoration: 'none'}} to='/pricing'> <Button style ={{fontSize: '18px' }}>Pricing</Button></Link>
      //       </div>
      //     </form>
      //   </nav>
      // </div>
      <BottomNavigation showLabels style={footerStyle}>
        <BottomNavigationAction label="About" value="About" icon={<AccountBalance/>}/>
        <BottomNavigationAction label="Terms And Conditions" value="Terms And Conditions" icon={<Class/>}/>
        <BottomNavigationAction label="Privacy Policy" value="Privacy Policy" icon={<PolicyIcon/>}/>
        <BottomNavigationAction label="Pricing" value="Pricing" icon={<MonetizationOnIcon/>}/>
      </BottomNavigation>
    );
  }
}
