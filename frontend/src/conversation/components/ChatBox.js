import { Component } from "react";
import React from "react";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

require("../styles/ConversationScreen.css");
toast.configure();

const FILE_UPLOAD_PREFIX = "https://torquerf1.s3.ap-south-1.amazonaws.com/";

class ChatBox extends Component {
  state = {
    text: "",
    isFileSendDialogueOpen: false,
    file: "",
    isSpinnerVisible: false
  };

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ text: "" });
    this.props.onSend(this.state.text);
  }

  notifyOnSuccess = () => {
    toast.success("File sent successfully to the client", {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  notifyOnFailure = () => {
    toast.error("Something went wrong,file could not be sent", {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  handleFileUrlAddToMessages = (urlString, timestamp) => {
    const {
      influencerUsername,
      projectInitiationDate,
      clientId,
      appendMessage
    } = this.props;
    const messageObejct = {};
    messageObejct["message"] = urlString;
    messageObejct["timestamp"] = timestamp;
    messageObejct["influencerUsername"] = influencerUsername;
    messageObejct["projectInitiationDate"] = projectInitiationDate;
    messageObejct["fromInfluencer"] = true;
    messageObejct["clientId"] = parseInt(clientId);
    appendMessage(messageObejct);
  };

  handleFileUpload = () => {
    this.setState({ isSpinnerVisible: true });
    const { file } = this.state;
    const { influencerUsername, clientId, projectInitiationDate } = this.props;
    var formData = new FormData();
    formData.append("file", file[0]);
    formData.append("influencerUsername", influencerUsername);
    formData.append("clientId", clientId);
    formData.append("projectInitiationDate", projectInitiationDate);
    axios
      .post("/messages/file_upload", formData, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        const timestamp = response.data.timestamp;
        this.handleFileUrlAddToMessages(
          FILE_UPLOAD_PREFIX.concat(file[0].name),
          timestamp
        );
        this.setState({ isSpinnerVisible: false });
        this.notifyOnSuccess();
        this.setState({ isFileSendDialogueOpen: false });
      })
      .catch(() => {
        this.setState({ isSpinnerVisible: false });
        this.notifyOnFailure();
      });
  };

  handleDialogueOpen = () => {
    this.setState({ isFileSendDialogueOpen: true });
  };

  setFile(event) {
    this.setState({ file: event.target.files });
  }

  handleDialogueClose = () => {
    this.setState({ isFileSendDialogueOpen: false });
    this.setState({ isSpinnerVisible: false });
  };

  render() {
    return (
      <div className="input">
        <form
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            maxWidth: "900px",
            margin: "0 auto 40px"
          }}
        >
          <input
            onChange={e => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Enter your message and press ENTER"
            autofocus="true"
          />
          <IconButton onClick={e => this.onSubmit(e)}>
            <SendIcon />
          </IconButton>
          <IconButton onClick={this.handleDialogueOpen}>
            <AttachFileIcon />
          </IconButton>
        </form>

        <Dialog
          open={this.state.isFileSendDialogueOpen}
          onClose={this.handleDialogueClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Attach File</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Attach the files here by choosing the files from your system
            </DialogContentText>
            <input
              display="none"
              type="file"
              name="docx"
              onChange={this.setFile.bind(this)}
            />
          </DialogContent>
          {this.state.isSpinnerVisible && <LinearProgress />}
          <DialogActions>
            <Button onClick={this.handleDialogueClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleFileUpload} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ChatBox;
