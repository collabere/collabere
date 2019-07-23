import React from "react";
import { local, dev } from "../../config/envConfig";
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as MaterialUiLibrary from "@material-ui/core";

class ProjectCreationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      city: "",
      country: "",
      companyName: "",
      industry: "",
      designation: "",
      companyUrl: "",
      phoneNumber: "",
      emailValidFlag: false,
      emailExistPromptOpen: false,
      openClientInfoModal: false,
      openProjectInfoModal: false,
      minBudget: "",
      maxBudget: "",
      introText: "",
      projectSaveSuccess: false,
      influencerUsername: ""
    };
    this.handleChangeOfInputFields = this.handleChangeOfInputFields.bind(this);
    this.validateClientEmail = this.validateClientEmail.bind(this);
    this.url = process.env.NODE_ENV === undefined ? local.url : dev.url;
    this.handleClosingOfEmailPrompt = this.handleClosingOfEmailPrompt.bind(
      this
    );
    this.handleOpeningOfEmailPrompt = this.handleOpeningOfEmailPrompt.bind(
      this
    );
    this.handleOpeningOfClientInfoModal = this.handleOpeningOfClientInfoModal.bind(
      this
    );
    this.handleClosingOfClientInfoModal = this.handleClosingOfClientInfoModal.bind(
      this
    );
    this.handleRegisterThroughEmailPrompt = this.handleRegisterThroughEmailPrompt.bind(
      this
    );
    this.handleOpeningOfProjectInfoModal = this.handleOpeningOfProjectInfoModal.bind(
      this
    );
    this.handleClosingOfProjectInfoModal = this.handleClosingOfProjectInfoModal.bind(
      this
    );
    this.handleProjectInfoModalThroughClientInfoModal = this.handleProjectInfoModalThroughClientInfoModal.bind(
      this
    );
    this.handleSavingOfProjectDetails = this.handleSavingOfProjectDetails.bind(
      this
    );
    this.handleOpeningOfProjectSuccessModal = this.handleOpeningOfProjectSuccessModal.bind(
      this
    );
    this.handleClosingOfProjectSuccessModal = this.handleClosingOfProjectSuccessModal.bind(
      this
    );
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.setState({ influencerUsername: params.influencerUsername });
  }

  handleCredentialSubmit() {
    axios({
      method: "put",
      url: `/client/put`,
      data: {
        name: this.state.name,
        email: this.state.email,
        companyName: this.state.companyName,
        designation: this.state.designation,
        companyUrl: this.state.companyUrl,
        city: this.state.city,
        country: this.state.country,
        industry: this.state.industry,
        phoneNumber: this.state.phoneNumber
      },
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => {
        this.setState({ successModal: true });
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleClientEmailSubmit(email) {
    this.validateClientEmail(email);
    this.handleOpeningOfEmailPrompt();
  }

  validateClientEmail(email) {
    axios
      .get(`/client/clientEmail`, {
        params: { clientEmail: email }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          emailValidFlag: res.data
        });
      });
  }

  handleChangeOfInputFields(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  handleClosingOfEmailPrompt() {
    this.setState({ emailExistPromptOpen: false });
  }

  handleOpeningOfClientInfoModal() {
    this.setState({ openClientInfoModal: true });
  }

  handleClosingOfClientInfoModal() {
    this.setState({ openClientInfoModal: false });
  }

  handleOpeningOfProjectInfoModal() {
    this.setState({ openProjectInfoModal: true });
  }

  handleClosingOfProjectInfoModal() {
    this.setState({ openProjectInfoModal: false });
  }

  handleProjectInfoModalThroughClientInfoModal() {
    this.handleCredentialSubmit();
    this.handleOpeningOfProjectInfoModal();
    this.handleClosingOfClientInfoModal();
  }

  handleRegisterThroughEmailPrompt() {
    if (this.state.emailValidFlag) {
      this.handleOpeningOfProjectInfoModal();
    } else {
      this.handleOpeningOfClientInfoModal();
    }
    this.handleClosingOfEmailPrompt();
  }

  handleOpeningOfEmailPrompt() {
    this.setState({ emailExistPromptOpen: true });
  }

  handleClosingOfProjectSuccessModal() {
    this.setState({ projectSaveSuccess: false });
    this.handleClosingOfProjectInfoModal();
  }

  handleOpeningOfProjectSuccessModal() {
    this.setState({ projectSaveSuccess: true });
  }

  handleSavingOfProjectDetails() {
    axios({
      method: "put",
      url: `/project/put`,
      data: {
        email: this.state.email,
        influencerUserName: this.state.influencerUsername,
        minBudget: this.state.minBudget,
        maxBudget: this.state.maxBudget,
        introText: this.state.introText
      },
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => {
        this.handleOpeningOfProjectSuccessModal();
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div
        style={{
          maxWidth: "70%",
          border: "1px solid green",
          padding: "2px",
          margin: "5% auto 5% auto"
        }}
      >
        <Form
          className="form"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          <Col>
            <FormGroup>
              <Label>Enter your email here</Label>
              <Input
                type="text"
                name="email"
                id="email"
                onChange={this.handleChangeOfInputFields}
              />
            </FormGroup>
          </Col>
          <Col>
            <Button
              color="primary"
              onClick={() => this.handleClientEmailSubmit(this.state.email)}
            >
              Get Started!
            </Button>
          </Col>
        </Form>
        <Modal isOpen={this.state.openClientInfoModal}>
          <ModalHeader>Register As Client</ModalHeader>
          <ModalBody>
            <Col>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.handleChangeOfInputFields}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  id="city"
                  onChange={this.handleChangeOfInputFields}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Country</Label>
                <Input
                  type="text"
                  name="country"
                  id="country"
                  onChange={this.handleChangeOfInputFields}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Company Name</Label>
                <Input
                  type="text"
                  name="companyName"
                  id="companyName"
                  onChange={this.handleChangeOfInputFields}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Phone Number</Label>
                <Input
                  type="text"
                  name="industry"
                  id="industry"
                  onChange={this.handleChangeOfInputFields}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Designation</Label>
                <Input
                  type="text"
                  name="designation"
                  id="designation"
                  onChange={this.handleChangeOfInputFields}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Company Url</Label>
                <Input
                  type="text"
                  name="companyUrl"
                  id="companyUrl"
                  onChange={this.handleChangeOfInputFields}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Industry</Label>
                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  onChange={this.handleChangeOfInputFields}
                />
              </FormGroup>
            </Col>
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              onClick={this.handleClosingOfClientInfoModal}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={this.handleProjectInfoModalThroughClientInfoModal}
            >
              {" "}
              Save Details and Continue to Project
            </Button>{" "}
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.openProjectInfoModal}>
          <ModalHeader>Fill Up Project Details</ModalHeader>
          <ModalBody>
            <Col>
              <FormGroup>
                <Label>Minimum Budget</Label>
                <Input
                  type="text"
                  name="minBudget"
                  id="minBudget"
                  onChange={this.handleChangeOfInputFields}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Maximum Budget</Label>
                <Input
                  type="text"
                  name="maxBudget"
                  id="maxBudget"
                  onChange={this.handleChangeOfInputFields}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Introduction Text</Label>
                <Input
                  type="text"
                  name="introText"
                  id="introText"
                  onChange={this.handleChangeOfInputFields}
                />
              </FormGroup>
            </Col>
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              onClick={this.handleClosingOfProjectInfoModal}
            >
              Cancel
            </Button>
            <Button color="primary" onClick={this.handleSavingOfProjectDetails}>
              {" "}
              Save
            </Button>{" "}
          </ModalFooter>
        </Modal>
        <Dialog
          open={this.state.emailExistPromptOpen}
          onClose={this.handleClosingOfEmailPrompt}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Status"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.emailValidFlag
                ? "Awesome you are already onboarded go ahead with creating project"
                : "You are currently not registered with us please fill up some basic details to continue project creation."}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <MaterialUiLibrary.Button
              onClick={this.handleClosingOfEmailPrompt}
              color="primary"
            >
              Cancel
            </MaterialUiLibrary.Button>
            <MaterialUiLibrary.Button
              onClick={this.handleRegisterThroughEmailPrompt}
              color="primary"
              autoFocus
            >
              {this.state.emailValidFlag
                ? "Create Project"
                : "Register As Client"}
            </MaterialUiLibrary.Button>
          </DialogActions>
        </Dialog>
        <Modal isOpen={this.state.projectSaveSuccess}>
          <ModalHeader>Success!</ModalHeader>
          <ModalBody>Yayy! The Project has been saved successfully</ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              onClick={this.handleClosingOfProjectSuccessModal}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ProjectCreationScreen;
