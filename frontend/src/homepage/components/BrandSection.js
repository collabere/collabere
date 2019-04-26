import React from "react";
import { Input, Button } from "antd";
import axios from "axios";


class BrandSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);

  }
  

handleChange(event) {
console.log("impur change")
this.setState({email: event.target.value});
};


handleEmailSubmit () {
  console.log("impur change ready")
  axios.post('http://127.0.0.1:8000/client/intro_email', {
    email: this.state.email
  })
}

render() {

  return (
    <div>
      <div className="section-content" id={this.props.id}>
        <h1>Product for brands</h1>
        <p>Drop your email here to know</p>
        <Input onChange = {this.handleChange} placeholder="Enter email here" />
        <Button onClick = {this.handleEmailSubmit}>Submit</Button>
      </div>
    </div>
  );
}
}
export default BrandSection;


