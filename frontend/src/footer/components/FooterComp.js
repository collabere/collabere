import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

export default class FooterComp extends React.Component {
  render() {
    return (
      <div style={{ height: "150px" }}>
        <nav
          class="navbar navbar-light"
          style={{ backgroundColor: "#464646", height: "150px" }}
        >
          <form class="form-inline" style={{  paddingLeft: "170px" }}
        >
            <div>
              <Link to='/terms-conditions'><Button style ={{fontSize: '18px' }}>Terms and conditions</Button></Link>
            </div>
            <div  style={{ paddingLeft: "150px" }}>
            <Link to='/privacy-policy'> <Button style ={{fontSize: '18px' }}>Privacy policy</Button></Link>
            </div>
            <div  style={{ paddingLeft: "150px" }}>
              <Button style ={{fontSize: '18px' }}>Careers</Button>
            </div>
            <div  style={{ paddingLeft: "150px" }}>
            <Link to='/pricing'> <Button style ={{fontSize: '18px' }}>Pricing</Button></Link>
            </div>
          </form>
        </nav>
      </div>
    );
  }
}
