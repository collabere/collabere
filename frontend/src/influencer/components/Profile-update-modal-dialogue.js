import { Modal } from "antd";
import React from "react";
import * as MaterialUiLibrary from "@material-ui/core";
import { Form, Input } from "antd";
import axios from "axios";
import { keys } from "@material-ui/core/styles/createBreakpoints";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DatePicker } from "antd";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { getInfluecerDetailsPromise } from "../rest/InfluencerService.js";

function validateEmail(emailField) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (!emailField) {
    return true;
  }
  return reg.test(emailField);
}

class UpdateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateData: {},
      visible: false,
      successModalVisible: false,
      spinnerVisible: false,
      influencerDetails: null
    };
    this.handleChangeOfInputFields = this.handleChangeOfInputFields.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    getInfluecerDetailsPromise(token, this.props.influencerUsername)
      .then(response => {
        console.log(response);
        this.setState({ influencerDetails: response.data[0] });
      })
      .catch(error => {
        console.log("Unable to fetch influencer details!");
      });
  }

  handleUpdateProfile() {
    this.setState({ spinnerVisible: true });
    axios({
      method: "put",
      url: `/influencer/updateDetails`,
      data: this.constructRequiredObject(this.state.updateData),
      headers: {
        "content-type": "application/json",
        Authorization: `${localStorage.getItem("token")}`
      }
    })
      .then(response => {
        this.setState({ spinnerVisible: false });
        this.setState({ influencerDetails: response.data });
        this.handleSuccessModalOpen();
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  constructRequiredObject = inputObj => {
    var requiredObj = {};
    Object.keys(inputObj).forEach(e => {
      if (inputObj[e] !== "") {
        requiredObj[e] = inputObj[e];
      }
    });
    requiredObj["username"] = this.props.influencerUsername;
    return requiredObj;
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleSuccessModalOpen = () => {
    this.setState({
      successModalVisible: true
    });
  };

  handleSuccessModalClose = () => {
    this.setState({ successModalVisible: false });
    this.handleOk();
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  handleChangeOfInputFields(event) {
    event.preventDefault();
    var key = event.target.name;
    var value = event.target.value;
    this.setState(prevState => {
      let updateDataClone = Object.assign({}, prevState.updateData);
      updateDataClone[key] = value;
      return { updateData: updateDataClone };
    });
  }

  onChangeOfDate = (date, dateString) => {
    var key = "dob";
    var value = dateString;
    this.setState(prevState => {
      let updateDataClone = Object.assign({}, prevState.updateData);
      updateDataClone[key] = value;
      return { updateData: updateDataClone };
    });
  };

  render() {
    const { spinnerVisible, influencerDetails } = this.state;
    return (
      <div>
        <MaterialUiLibrary.Button type="primary" onClick={this.showModal}>
          My Profile
        </MaterialUiLibrary.Button>
        <Modal
          title="My Profile"
          visible={this.state.visible}
          onOk={this.handleUpdateProfile}
          onCancel={this.handleCancel}
          okButtonProps={
            !validateEmail(this.state.updateData.email)
              ? { style: { display: "none" } }
              : null
          }
        >
          {influencerDetails && (
            <Card>
              <CardContent>
                <Typography variant="body2" component="p">
                  Email: {influencerDetails.email}
                </Typography>
                <Typography variant="body2" component="p">
                  Country: {influencerDetails.country}
                </Typography>
                <Typography variant="body2" component="p">
                  Industry: {influencerDetails.industry}
                </Typography>
                <Typography variant="body2" component="p">
                  Date of Birth: {influencerDetails.dob}
                </Typography>
              </CardContent>
            </Card>
          )}

          <Form style={{ paddingTop: "2rem" }}>
            <p>Update Details:</p>
            <Form.Item>
              <Input
                name="name"
                placeholder="Name"
                onChange={this.handleChangeOfInputFields}
              />
            </Form.Item>
            <Form.Item>
              <Input
                name="email"
                placeholder="Email"
                onChange={this.handleChangeOfInputFields}
              />
              {!validateEmail(this.state.updateData.email) && (
                <p style={{ color: "red" }}>Please enter the valid email!</p>
              )}
            </Form.Item>
            <Form.Item>
              <Input
                name="country"
                placeholder="Country"
                onChange={this.handleChangeOfInputFields}
              />
            </Form.Item>
            <Form.Item>
              <Input
                name="industry"
                placeholder="Industry"
                onChange={this.handleChangeOfInputFields}
              />
            </Form.Item>
            <Form.Item>
              <DatePicker
                placeholder="Date Of Birth"
                name="dob"
                onChange={this.onChangeOfDate}
              />
            </Form.Item>
          </Form>
          {spinnerVisible ? <CircularProgress /> : null}
        </Modal>
        <Dialog
          open={this.state.successModalVisible}
          onClose={this.handleSuccessModalClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your profile has been updated successfully.
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

export default UpdateModal;
