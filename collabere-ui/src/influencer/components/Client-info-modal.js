import { Modal, Button } from 'antd';
import React from "react";

class ClientInfoModal extends React.Component {
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div>
        <Button type="primary" style={{height:'17px'}} onClick={this.showModal}>
          Additional Info
        </Button>
        <Modal
          title="About"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{this.props.email}</p>
        </Modal>
      </div>
    );
  }
}
export default ClientInfoModal
