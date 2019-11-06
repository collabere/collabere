import React from "react";
import { Input, Button, Modal } from "antd";
import axios from "axios";
import * as MaterialUiLibrary from "@material-ui/core";
import { local, dev } from '../../config/envConfig';
import CollaborateImg from '../../../images/resized1.jpg';

class BrandSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      openSuccessfullModal: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
    this.url = (process.env.NODE_ENV === undefined) ? local.url : dev.url;
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
  axios.post(`/client/intro_email`, {
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
  const cardStyle = {
    minWidth: 275,
    textAlign: 'center',
    backgroundImage: `url(${CollaborateImg})`
  }

  const paddingStyle = {
    paddingBottom: 5,
    paddingTop: 5,
  }

  return (
    <div style={paddingStyle}>
      <MaterialUiLibrary.Card style={cardStyle}>
        <MaterialUiLibrary.CardContent>
          <MaterialUiLibrary.Typography variant="h5" component="h2">
            Product for brands
          </MaterialUiLibrary.Typography>
          <MaterialUiLibrary.Typography variant="body2" component="p">
            Drop your email here to know
          </MaterialUiLibrary.Typography>
          <MaterialUiLibrary.TextField
          id="outlined-email-input"
          label="Enter Email Here"
          // className={classes.textField}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
        /><br/>
        <MaterialUiLibrary.Button variant="contained" color="primary">Submit</MaterialUiLibrary.Button>
        </MaterialUiLibrary.CardContent>
      </MaterialUiLibrary.Card>
    </div>
    // <div>
    //   <div className="section-content" id={this.props.id}>
    //     <h1>Product for brands</h1>
    //     <p>Drop your email here to know</p>
    //     <Input onChange = {this.handleChange} placeholder="Enter email here" />
    //     <MaterialUiLibrary.Button variant="contained" color="primary" onClick = {this.handleEmailSubmit} disabled ={!this.state.email}>Submit</MaterialUiLibrary.Button>
    //     <div>
    //     <Modal
    //       title="Successful"
    //       visible={this.state.openSuccessfullModal}
    //       onOk={this.handleOk}
    //       onCancel={this.handleCancel}
    //     >
    //       <p>Email Submittted Successfully</p>
    //     </Modal>
    //   </div>
    //   </div>
    // </div>
  );
}
}
export default BrandSection;


