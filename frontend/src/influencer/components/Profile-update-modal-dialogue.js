import { Modal } from "antd";
import React from "react";
import * as MaterialUiLibrary from "@material-ui/core";
import * as Antd from "antd";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { keys } from "@material-ui/core/styles/createBreakpoints";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';



class UpdateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateData: {},
      visible: false,
      successModalVisible: false,
      spinnerVisible: false
    };
    this.handleChangeOfInputFields = this.handleChangeOfInputFields.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
  }

  handleUpdateProfile() {
    this.setState({spinnerVisible: true})
    axios({
      method: "put",
      url: `/influencer/updateDetails`,
      data: this.constructRequiredObject(this.state.updateData),
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(response => {
        this.setState({spinnerVisible: false})
        console.log(response);
        this.handleSuccessModalOpen()
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

  handleSuccessModalClose =() =>{
    this.setState({successModalVisible: false})
    this.handleOk();
}

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

  render() {
    const {spinnerVisible}= this.state
    return (
      <div>
        <MaterialUiLibrary.Button type="primary" onClick={this.showModal}>
          Update Profile
        </MaterialUiLibrary.Button>
        <Modal
          title="Update Profile"
          visible={this.state.visible}
          onOk={this.handleUpdateProfile}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" disabled />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                onChange={this.handleChangeOfInputFields}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                onChange={this.handleChangeOfInputFields}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                name="gender"
                type="text"
                onChange={this.handleChangeOfInputFields}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Country</Form.Label>
              <Form.Control
                name="country"
                type="text"
                onChange={this.handleChangeOfInputFields}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Date of birth</Form.Label>
              <Form.Control
                name="dob"
                type="date"
                onChange={this.handleChangeOfInputFields}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Industry</Form.Label>
              <Form.Control
                name="industry"
                type="text"
                onChange={this.handleChangeOfInputFields}
              />
            </Form.Group>
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
