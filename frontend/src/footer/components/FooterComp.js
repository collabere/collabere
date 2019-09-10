import React from "react";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

export default class FooterComp extends React.Component {
  render() {
    return (
      <div  style={{margin: "auto" }}>
        <nav
          class="navbar navbar-light"
          style={{ backgroundColor: "#696969", height: "150px" }}
        >
          <form inline
        >
            <div>
              <Link  style={{textDecoration: 'none'}} to='/terms-conditions'><Button style ={{fontSize: '18px' }}>Terms and conditions</Button></Link>
            </div>
            <div  >
            <Link  style={{textDecoration: 'none'}} to='/privacy-policy'> <Button style ={{fontSize: '18px' }}>Privacy policy</Button></Link>
            </div>
            <div  >
            <Link style={{textDecoration: 'none'}} to='/pricing'> <Button style ={{fontSize: '18px' }}>Pricing</Button></Link>
            </div>
          </form>
        </nav>
      </div>
    );
  }
}
