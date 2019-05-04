import Modal from 'antd/lib/modal/Modal';
import React from "react";
import * as MaterialUiLibrary from "@material-ui/core";
import Form from 'react-bootstrap/Form'



class UpdateModal extends React.Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
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
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text"  />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>InstaHashTag</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
            </Form>;
        </Modal>
      </div>
    );
  }
}

export default UpdateModal;
