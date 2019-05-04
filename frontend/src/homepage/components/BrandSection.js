import React from "react";
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';
import axios from "axios";
import * as MaterialUiLibrary from "@material-ui/core";



class BrandSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      openSuccessfullModal: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);

  }
  

handleChange(event) {
console.log("impur change")
this.setState({email: event.target.value});
};

handleCancel = () => {
  this.setState({
    openSuccessfullModal: false,
  });
}


handleEmailSubmit () {
  console.log("impur change ready")
  axios.post('http://127.0.0.1:8000/client/intro_email', {
    email: this.state.email
  })
  this.setState({openSuccessfullModal: true})
}

handleOk = () => {
  this.setState({
    visible: false,
  });
}


render() {

  return (
    <div>
      <div className="section-content" id={this.props.id}>
        <h1>Product for brands</h1>
        <p>Drop your email here to know</p>
        <Input onChange = {this.handleChange} placeholder="Enter email here" />
        <MaterialUiLibrary.Button variant="contained" color="primary" onClick = {this.handleEmailSubmit} disabled ={!this.state.email}>Submit</MaterialUiLibrary.Button>
        <div>
        <Modal
          title="Successful"
          visible={this.state.openSuccessfullModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Email Submittted Successfully</p>
        </Modal>
      </div>
      </div>
    </div>
  );
}
}
export default BrandSection;


