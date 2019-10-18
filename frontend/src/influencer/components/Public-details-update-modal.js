import { Modal } from "antd";
import React from "react";
import * as MaterialUiLibrary from "@material-ui/core";
import * as Antd from "antd";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { keys } from "@material-ui/core/styles/createBreakpoints";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";

class UpdatePublicProfileModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateData: {},
      visible: false,
      successModalVisible: false,
      spinnerVisible: false
    };
    this.handleUpdatePublicProfile = this.handleUpdatePublicProfile.bind(this);
    this.handleChangeOfMultilineInputFields = this.handleChangeOfMultilineInputFields.bind(
      this
    );
  }

  handleUpdatePublicProfile() {
    this.setState({ spinnerVisible: true });
    axios({
      method: "put",
      url: `http://localhost:8000/influencer/update_public_details`,
      data: this.constructRequiredObject(this.state.updateData),
      headers: {
        "content-type": "application/json",
        Authorization: sessionStorage.getItem("token")
      }
    })
      .then(response => {
        this.setState({ spinnerVisible: false });
        console.log(response);
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
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleChangeOfMultilineInputFields(event) {
    event.preventDefault();
    var key = event.target.id;
    var initialValue = event.target.value;
    var value = initialValue.split("\n").join(",");
    this.setState(prevState => {
      let updateDataClone = Object.assign({}, prevState.updateData);
      updateDataClone[key] = value;
      return { updateData: updateDataClone };
    });
  }

  render() {
    const { spinnerVisible } = this.state;
    return (
      <div>
        <MaterialUiLibrary.Button type="primary" onClick={this.showModal}>
          Update Public Profile
        </MaterialUiLibrary.Button>
        <Modal
          title="Update Public Details"
          visible={this.state.visible}
          onOk={this.handleUpdatePublicProfile}
          onCancel={this.handleCancel}
        >
          <Form>
            <TextField
              id="videoLink"
              label="Enter Video Links Here"
              multiline
              rowsMax="10"
              onChange={this.handleChangeOfMultilineInputFields}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="referralLink"
              label="Enter Referal Links Here"
              multiline
              rowsMax="10"
              onChange={this.handleChangeOfMultilineInputFields}
              margin="normal"
              variant="outlined"
            />
          </Form>
          {spinnerVisible ? <CircularProgress /> : null}
        </Modal>
        <Dialog
          open={this.state.successModalOpen}
          onClose={this.handleSuccessModalClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your public details has been updated successfully.
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

export default UpdatePublicProfileModal;
