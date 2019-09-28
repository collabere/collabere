import { Modal } from "antd";
import React from "react";
import * as MaterialUiLibrary from "@material-ui/core";
import * as Antd from "antd";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { keys } from "@material-ui/core/styles/createBreakpoints";


class UpdateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateData: {}

    };
    this.handleChangeOfInputFields = this.handleChangeOfInputFields.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);


  }

  handleUpdateProfile(){
    axios({
      method: "put",
      url: `/influencer/updateDetails`,
      data: this.constructRequiredObject(this.state.updateData),
      headers: {
        "content-type": "application/json",
        'Authorization': sessionStorage.getItem('token')
      }
    })
      .then(response => {
        console.log(response);
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
    requiredObj['username']=this.props.influencerUsername
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

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  handleChangeOfInputFields(event) {
    event.preventDefault();
    var key =event.target.name;
    var value = event.target.value;
    this.setState(prevState => {
      let updateDataClone = Object.assign({}, prevState.updateData);  
      updateDataClone[key] = value;                     
      return {updateData: updateDataClone };                               
    })
  }

  render() {
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
              <Form.Control type="text" />
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
        </Modal>
      </div>
    );
  }
}

export default UpdateModal;
