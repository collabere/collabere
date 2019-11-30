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
      currentReferral: ""
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
          Authorization: localStorage.getItem("token")
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

  handleUpdatePublicProfile() {
    this.setState({ spinnerVisible: true });
    axios({
      method: "put",
      url: `/influencer/update_public_details`,
      data: this.constructRequiredObject(),
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
      existingLinks: joined
    });
  };

  handleReferralAdd = () => {
    var joined = this.state.existingReferrals.concat(
      this.state.currentReferral
    );
    this.setState({
      existingReferrals: joined
    });
  };

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
            <div style={{ width: "20rem" }}>
              <List>
                {this.state.existingLinks.map(function(item) {
                  return <ListItem key={item}>{item}</ListItem>;
                })}
              </List>
              <ExpansionPanel>
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
                  return <ListItem key={item}>{item}</ListItem>;
                })}
              </List>
              <ExpansionPanel>
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
                    onClick={this.handleReferralAdd}
                  >
                    <AddIcon />
                  </Fab>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
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
