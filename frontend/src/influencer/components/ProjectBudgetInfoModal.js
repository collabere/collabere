import { Modal } from "antd";
import React from "react";
import * as MaterialUiLibrary from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

class ProjectBudgetInfoModal extends React.Component {
  state = {
    ModalText: "Content of the modal",
    visible: false,
    confirmLoading: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div>
        <MaterialUiLibrary.Button
          onClick={this.showModal}
          size="small"
          variant="contained"
          color="primary"
        >
          Budget Details
        </MaterialUiLibrary.Button>
        <Modal
          title="Budget Details"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <Typography>Maximum Budget: {this.props.minBudget}</Typography>
          <Typography>Minimuum Budget: {this.props.maxBudget}</Typography>
        </Modal>
      </div>
    );
  }
}
export default ProjectBudgetInfoModal;
