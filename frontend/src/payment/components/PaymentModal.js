import React, { Component } from "react";
import { Modal, Button } from "antd";
import Checkout from "./Checkout";

class PaymentModal extends React.Component {
  state = { visible: false };

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

  render() {
    return (
      <div>
        <h6 onClick={this.showModal}>Payment</h6>
        <Modal
          title="Payments"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Checkout />
        </Modal>
      </div>
    );
  }
}
export default PaymentModal;
