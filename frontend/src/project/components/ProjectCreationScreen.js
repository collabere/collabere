import React from "react";
import { local, dev } from "../../config/envConfig";
import { Col, Form, FormGroup, Button } from "reactstrap";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { Modal as AntdModal } from "antd";
import { Collapse, Icon } from "antd";
import {
  Form as AntdForm,
  Input as AntdInput,
  Button as AntdButton
} from "antd";
import { toast } from "react-toastify";
import { Spin } from "antd";

toast.configure();

const { Panel } = Collapse;

function validateEmail(emailField) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (emailField !== "" && reg.test(emailField) === false) {
    return false;
  }
  return true;
}

const customPanelStyle = {
  background: "#f7f7f7",
  borderRadius: 4,
  marginBottom: 24,
  border: 0
};

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
      emailValidFlag: null,
      minBudget: "",
      maxBudget: "",
      introText: "",
      influencerUsername: "",
      passPhrase: null,
      clientRevisitFlag: null,
      modalOpenFlag: false,
      clientUpdateProgress: false,
      projectCreateProgress: false
    };
    this.handleChangeOfInputFields = this.handleChangeOfInputFields.bind(this);
    this.validateClientEmail = this.validateClientEmail.bind(this);
    this.url = process.env.NODE_ENV === undefined ? local.url : dev.url;

    this.handleSavingOfProjectDetails = this.handleSavingOfProjectDetails.bind(
      this
    );
    this.handleChangeOfClientEmail = this.handleChangeOfClientEmail.bind(this);
    this.handleCredentialSubmit = this.handleCredentialSubmit.bind(this);
  }

  componentDidMount() {
    const { influencerUsername } = this.props;
    this.setState({ influencerUsername: influencerUsername });
  }

  notifyOnSuccessOnProjectCreation = () => {
    toast.success("Project created successfully!", {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  notifyOnSuccessOnClientDetails = () => {
    toast.success("Details saved successfully!", {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  notifyOnFailure = () => {
    toast.error("There was some problem in the operation!", {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  handleCredentialSubmit() {
    this.setState({ clientUpdateProgress: true });
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
        phoneNumber: this.state.phoneNumber,
        influencerUsername: this.state.influencerUsername
      },
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => {
        this.setState({ emailValidFlag: true, clientUpdateProgress: false });
        this.notifyOnSuccessOnClientDetails();
      })
      .catch(function(error) {
        this.setState({ clientUpdateProgress: false });
        this.notifyOnFailure();
      });
  }

  handleClientEmailSubmit(email) {
    this.validateClientEmail(email);
  }

  validateClientEmail(email) {
    axios
      .get(`/client/clientEmail`, {
        params: { clientEmail: email }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          clientRevisitFlag: res.data,
          modalOpenFlag: true
        });
      });
  }

  handleChangeOfInputFields(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChangeOfClientEmail(event) {
    event.preventDefault();
    this.setState({ [event.target.id]: event.target.value });
  }

  handleChangeOfClientPassPhrase = event => {
    event.preventDefault();
    this.setState({ [event.target.id]: event.target.value });
  };

  handleModalClose = () => {
    this.setState({ modalOpenFlag: false });
  };

  handleEmailAndPassPhraseSubmit = () => {
    axios({
      method: "post",
      url: `/client/validate_update_pass_phrase`,
      data: {
        email: this.state.email,
        updatePassPhrase: this.state.passPhrase
      },
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => {
        this.setState({ emailValidFlag: true, modalOpenFlag: true });
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleSavingOfProjectDetails() {
    this.setState({ projectCreateProgress: true });

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
        this.notifyOnSuccessOnProjectCreation();
        this.setState({ projectCreateProgress: false });
      })
      .catch(function(error) {
        this.setState({ projectCreateProgress: false });
        this.notifyOnFailure();
      });
  }

  render() {
    const { email } = this.state;
    const { emailValidFlag, clientRevisitFlag } = this.state;

    return (
      <div
        style={{
          maxWidth: "70%",
          padding: "2px",
          margin: "1% auto 1% auto"
        }}
      >
        <Form className="form">
          <Col>
            <FormGroup>
              <TextField
                id="email"
                placeholder="Enter your email here"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={this.handleChangeOfClientEmail}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </FormGroup>
            {!validateEmail(email) && (
              <p style={{ color: "red" }}>
                Please enter a valid email address!
              </p>
            )}
            {clientRevisitFlag === true && (
              <TextField
                id="passPhrase"
                placeholder="Enter your pass phrase here"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={this.handleChangeOfClientPassPhrase}
                InputLabelProps={{
                  shrink: true
                }}
              />
            )}

            {clientRevisitFlag === true && (
              <p style={{ color: "red" }}>
                This mail is already registered ,please enter the pass phrase
                recived on mail to continue
              </p>
            )}
            {clientRevisitFlag === true ? (
              <Button
                color="primary"
                onClick={this.handleEmailAndPassPhraseSubmit}
                disabled={!validateEmail(email)}
              >
                Submit
              </Button>
            ) : (
              <Button
                color="primary"
                onClick={() => this.handleClientEmailSubmit(this.state.email)}
                disabled={!validateEmail(email)}
              >
                Get Started!
              </Button>
            )}
          </Col>
        </Form>

        <AntdModal
          title="Project and Client"
          visible={
            this.state.modalOpenFlag &&
            (this.state.clientRevisitFlag === false ||
              this.state.emailValidFlag === true)
          }
          onCancel={this.handleModalClose}
          okButtonProps={{ style: { display: "none" } }}
        >
          <Collapse
            bordered={false}
            expandIcon={({ isActive }) => (
              <Icon type="caret-right" rotate={isActive ? 90 : 0} />
            )}
          >
            <Panel header="Update Details" key="2" style={customPanelStyle}>
              <AntdForm layout="inline">
                <AntdForm.Item>
                  <AntdInput
                    placeholder="Name"
                    type="text"
                    name="name"
                    id="name"
                    onChange={this.handleChangeOfInputFields}
                  />
                </AntdForm.Item>
                <AntdForm.Item>
                  <AntdInput
                    placeholder="City"
                    type="text"
                    name="city"
                    id="city"
                    onChange={this.handleChangeOfInputFields}
                  />
                </AntdForm.Item>
                <AntdForm.Item>
                  <AntdInput
                    placeholder="Country"
                    type="text"
                    name="country"
                    id="country"
                    onChange={this.handleChangeOfInputFields}
                  />
                </AntdForm.Item>
                <AntdForm.Item>
                  <AntdInput
                    placeholder="Company Name"
                    type="text"
                    name="companyName"
                    id="companyName"
                    onChange={this.handleChangeOfInputFields}
                  />
                </AntdForm.Item>
                <AntdForm.Item>
                  <AntdInput
                    placeholder="Industry"
                    type="text"
                    name="industry"
                    id="industry"
                    onChange={this.handleChangeOfInputFields}
                  />
                </AntdForm.Item>
                <AntdForm.Item>
                  <AntdInput
                    placeholder="Designation"
                    type="text"
                    name="designation"
                    id="designation"
                    onChange={this.handleChangeOfInputFields}
                  />
                </AntdForm.Item>
                <AntdForm.Item>
                  <AntdInput
                    placeholder="Company Website Link"
                    type="text"
                    name="companyUrl"
                    id="companyUrl"
                    onChange={this.handleChangeOfInputFields}
                  />
                </AntdForm.Item>
                <AntdForm.Item>
                  <AntdInput
                    placeholder="Phone Number"
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    onChange={this.handleChangeOfInputFields}
                  />
                </AntdForm.Item>
                <AntdForm.Item>
                  <AntdButton onClick={this.handleCredentialSubmit}>
                    Submit
                  </AntdButton>
                </AntdForm.Item>
              </AntdForm>
              {this.state.clientUpdateProgress && <Spin />}
            </Panel>

            {emailValidFlag && (
              <Panel header="Create Project" key="1" style={customPanelStyle}>
                <AntdForm layout="inline">
                  <AntdForm.Item>
                    <AntdInput
                      placeholder="Minimum Budget"
                      type="text"
                      name="minBudget"
                      id="minBudget"
                      onChange={this.handleChangeOfInputFields}
                    />
                  </AntdForm.Item>
                  <AntdForm.Item>
                    <AntdInput
                      placeholder="Maximum Budget"
                      type="text"
                      name="maxBudget"
                      id="maxBudget"
                      onChange={this.handleChangeOfInputFields}
                    />
                  </AntdForm.Item>
                  <AntdForm.Item>
                    <AntdInput
                      placeholder="Intrduction Text"
                      type="text"
                      name="introText"
                      id="introText"
                      onChange={this.handleChangeOfInputFields}
                    />
                  </AntdForm.Item>
                  <AntdForm.Item>
                    <AntdButton onClick={this.handleSavingOfProjectDetails}>
                      Submit
                    </AntdButton>
                  </AntdForm.Item>
                </AntdForm>
                {this.state.projectCreateProgress && <Spin />}
              </Panel>
            )}
          </Collapse>
        </AntdModal>
      </div>
    );
  }
}

export default ProjectCreationScreen;
