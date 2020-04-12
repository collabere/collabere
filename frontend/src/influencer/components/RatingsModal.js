import React from "react";
import { Modal, Rate } from "antd";
import { returnUpdateClientRatePromise } from "../rest/ClientService.js";
import { toast } from "react-toastify";
toast.configure();

class RatingsModal extends React.Component {
  state = {
    ModalText: "Content of the modal",
    visible: false,
    confirmLoading: false,
    rating: null
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleRatingChange = value => {
    this.setState({ rating: value });
  };

  handleModalClose = () => {
    this.props.handleRatingsModalClose();
  };

  handleOk = async () => {
    const token = localStorage.getItem("token");
    const { clientId } = this.props;
    const { rating } = this.state;
    await returnUpdateClientRatePromise(token, clientId, rating);
    toast.success("Thanks for rating!", {
      position: toast.POSITION.TOP_RIGHT
    });
    this.handleModalClose();
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible } = this.props;
    return (
      <div>
        <Modal
          title="Please rate the client!"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleModalClose}
        >
          <Rate onChange={this.handleRatingChange} />
        </Modal>
      </div>
    );
  }
}
export default RatingsModal;
