import React from "react";
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import * as MaterialUiLibrary from "@material-ui/core";

import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Typography } from "antd";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class EmailInputForReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email:"",
        successModalOpen: false
    };
    this.handleChangeOfInputFields = this.handleChangeOfInputFields.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleSuccessModalOpen= this.handleSuccessModalOpen.bind(this);
    this.handleSuccessModalClose= this.handleSuccessModalClose.bind(this);

  }

  handleSend() {
    axios({
      method: "put",
      url: "http://localhost:8000/influencer/auth/send_email_to_reset_password/",
      data: {
        influencerEmail: this.state.email,
      },
      headers: {
        "content-type": "application/json"
      }
    }).then(response => {
      this.handleSuccessModalOpen()
    });
  }

  handleSuccessModalOpen(){
      this.setState({successModalOpen: true})
  }


  handleSuccessModalClose(){
    this.setState({successModalOpen: false})
}

  handleChangeOfInputFields(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div  style={{
        maxWidth: "70%",
        border: "1px solid green",
        padding: "2px",
        margin: "5% auto 5% auto",
      }}>
      <Form className="form">
        <Col>
          <FormGroup>
            <Label for="examplePassword">Enter email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              onChange={this.handleChangeOfInputFields}
            />
            <Typography>We will send you a password reset link on the above email</Typography>
          </FormGroup>
        </Col>
        <MaterialUiLibrary.Button variant="contained" color="primary" onClick={this.handleSend}>Send Link</MaterialUiLibrary.Button>

      </Form>
      <Dialog
        open={this.state.successModalOpen}
        onClose={this.handleSuccessModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Email Sent Successfully"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please check your mail and click on the link sent to reset the password.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MaterialUiLibrary.Button onClick={this.handleSuccessModalClose} color="primary">
            OK
          </MaterialUiLibrary.Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }
}

export default EmailInputForReset;
