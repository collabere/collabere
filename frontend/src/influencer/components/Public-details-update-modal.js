import { Modal } from "antd";
import React from "react";
import * as MaterialUiLibrary from "@material-ui/core";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { toast } from "react-toastify";

toast.configure();

function getId(url) {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return "error";
  }
}

class UpdatePublicProfileModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateData: {},
      visible: false,
      successModalVisible: false,
      spinnerVisible: false,
      existingLinks: [],
      existingReferrals: [],
      currentLink: "",
      currentReferral: "",
      changesInLists: false,
      file: "",
      loading: false,
      imageUrl: null
    };
    this.handleUpdatePublicProfile = this.handleUpdatePublicProfile.bind(this);
  }
  componentDidMount() {
    axios
      .get(`/influencer/get_public_details`, {
        params: {
          username: this.props.influencerUsername
        },
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        this.setState({
          existingLinks: res.data.videoLink
            ? res.data.videoLink.split(",")
            : [],
          existingReferrals: res.data.referralLink
            ? res.data.referralLink.split(",")
            : []
        });
      });
  }

  notifyOnSuccess = () => {
    toast.success("Profile Pic is set successfully", {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  notifyOnFailure = () => {
    toast.error("Something went wrong,image could not be set", {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  handleUpdatePublicProfile() {
    this.setState({ spinnerVisible: true });
    axios({
      method: "put",
      url: `/influencer/update_public_details`,
      data: this.constructRequiredObject(),
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
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
  constructRequiredObject = () => {
    var requiredObj = {};
    const { existingLinks } = this.state;
    const { existingReferrals } = this.state;
    requiredObj["videoLink"] = existingLinks.join(",");
    requiredObj["referralLink"] = existingReferrals.join(",");
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
    this.setState({ successModalVisible: false, visible: false });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleChangeOfVideoField = event => {
    this.setState({ currentLink: event.target.value });
  };

  handleChangeOfReferralField = event => {
    this.setState({ currentReferral: event.target.value });
  };

  handleVideoLinkAdd = () => {
    var joined = this.state.existingLinks.concat(this.state.currentLink);
    this.setState({
      existingLinks: joined,
      changesInLists: true
    });
  };

  handleReferralAdd = () => {
    var joined = this.state.existingReferrals.concat(
      this.state.currentReferral
    );
    this.setState({
      existingReferrals: joined,
      changesInLists: true
    });
  };

  uploadImage(event) {
    this.setState({ file: event.target.files, loading: true }, () => {
      const { file } = this.state;
      const { influencerUsername } = this.props;
      var formData = new FormData();
      formData.append("file", file[0]);
      formData.append("influencerUsername", influencerUsername);
      let config = {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      };
      axios
        .post("/influencer/update_profile_pic", formData, config)
        .then(response => {
          this.setState({
            imageUrl: response.data.profilePicUrl,
            loading: false
          });
          this.notifyOnSuccess();
        })
        .catch(() => {
          this.notifyOnFailure();
        });
    });
  }

  render() {
    const { spinnerVisible, changesInLists } = this.state;
    return (
      <div>
        <h6 type="primary" onClick={this.showModal}>
          UPDATE PORTFOLIO
        </h6>
        <Modal
          title="Update Public Details"
          visible={this.state.visible}
          onOk={this.handleUpdatePublicProfile}
          onCancel={this.handleCancel}
          okButtonProps={
            !changesInLists ? { style: { display: "none" } } : null
          }
        >
          <p style={{ color: "purple" }}>Upload your picture here:</p>
          <input
            display="none"
            type="file"
            name="docx"
            onChange={this.uploadImage.bind(this)}
          />
          {!this.state.imageUrl ? null : (
            <img
              src={this.state.imageUrl}
              alt="avatar"
              style={{ width: "100%" }}
            />
          )}

          <Form style={{ paddingTop: "3rem" }}>
            <div style={{ width: "20rem" }}>
              <List>
                {this.state.existingLinks.map(function(item) {
                  return (
                    <ListItem key={item}>
                      {
                        <iframe
                          src={"//www.youtube.com/embed/" + getId(item)}
                          frameborder="0"
                          width="300"
                          height="150"
                          allowfullscreen
                        ></iframe>
                      }
                    </ListItem>
                  );
                })}
              </List>
              <ExpansionPanel style={{ backgroundColor: "#fbd9d3" }}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Click here to add video links</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <TextField
                    id="standard-basic"
                    label="Add here"
                    margin="normal"
                    onChange={this.handleChangeOfVideoField}
                  />
                  <Fab
                    size="small"
                    color="secondary"
                    aria-label="add"
                    disabled={!this.state.currentLink}
                    onClick={this.handleVideoLinkAdd}
                  >
                    <AddIcon />
                  </Fab>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>

            <div style={{ width: "20rem", paddingTop: "3rem" }}>
              <List>
                {this.state.existingReferrals.map(function(item) {
                  return (
                    <ListItem key={item}>
                      <p style={{ wordBreak: "break-word" }}>{item}</p>
                    </ListItem>
                  );
                })}
              </List>
              <ExpansionPanel style={{ backgroundColor: "#fbd9d3" }}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Click here to add referral links</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <TextField
                    id="standard-basic"
                    label="Add here"
                    margin="normal"
                    onChange={this.handleChangeOfReferralField}
                  />
                  <Fab
                    size="small"
                    color="secondary"
                    aria-label="add"
                    disabled={!this.state.currentReferral}
                    onClick={this.handleReferralAdd}
                  >
                    <AddIcon />
                  </Fab>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          </Form>
          {spinnerVisible ? <CircularProgress /> : null}
          {this.state.loading ? <CircularProgress /> : null}
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
