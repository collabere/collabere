import React from "react";
import { Col, Form, FormGroup, Label, Input } from "reactstrap";
import * as MaterialUiLibrary from "@material-ui/core";

import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import HomeNavBar from "../homepage/components/Navbar";

class EmailInputForReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      successModalOpen: false
    };
    this.handleChangeOfInputFields = this.handleChangeOfInputFields.bind(this);
    this.handleResetButton = this.handleResetButton.bind(this);
    this.handleSuccessModalOpen = this.handleSuccessModalOpen.bind(this);
    this.handleSuccessModalClose = this.handleSuccessModalClose.bind(this);
  }

  handleResetButton() {
    const {
      match: { params }
    } = this.props;
    axios({
      method: "put",
      url: `/influencer/auth/change_password/`,
      data: {
        newPassword: this.state.password,
        influencerUsername: params.influencerUsername
      },
      headers: {
        "content-type": "application/json"
      }
    }).then(response => {
      this.handleSuccessModalOpen();
    });
  }

  handleSuccessModalOpen() {
    this.setState({ successModalOpen: true });
  }

  handleSuccessModalClose() {
    this.setState({ successModalOpen: false });
  }

  handleChangeOfInputFields(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div
        style={{
          maxWidth: "70%",
          padding: "2px",
          margin: "5% auto 5% auto"
        }}
      >
        <HomeNavBar />
        <Card style={{ backgroundColor: "#D8BFD8", marginTop: '2rem' }}>
          <CardContent>
            <Form className="form">
              <Col>
                <FormGroup>
                  <Label for="examplePassword">Enter new password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.handleChangeOfInputFields}
                  />
                </FormGroup>
              </Col>
              <MaterialUiLibrary.Button
                variant="contained"
                color="primary"
                onClick={this.handleResetButton}
              >
                RESET
              </MaterialUiLibrary.Button>
            </Form>
          </CardContent>
        </Card>

        <Dialog
          open={this.state.successModalOpen}
          onClose={this.handleSuccessModalClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Password has been reset successfully try logging in with the new
              password!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <MaterialUiLibrary.Button
              onClick={this.handleSuccessModalClose}
              color="primary"
            >
              OK
            </MaterialUiLibrary.Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default EmailInputForReset;
