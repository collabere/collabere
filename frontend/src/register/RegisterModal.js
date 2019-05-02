import React from "react";
import { Link as _Link } from 'react-router-dom';


import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import axios from "axios";
import LoginScreen from "../login/LoginScreen";
import LoginModal from "../login/loginModal";

class RegisterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: "",
      handle: "",
      dob: "",
      gender: "",
      city: "",
      country: "",
      industry: "",
      passwordFirst: '',
      passwordSecond: '',
      successModal: false,
      loginScreenOpen: false
    };
    this.handleChangeOfInputFields = this.handleChangeOfInputFields.bind(this);
    this.handleChangeOfInputName = this.handleChangeOfInputName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.openLoginModal = this.openLoginModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);


  }

  handleCredentialSubmit() {
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/influencer/register/",
      data: {
        name: this.state.name,
        email: this.state.email,
        handle: this.state.handle,
        dob: this.state.dob,
        gender: this.state.gender,
        city: this.state.city,
        country: this.state.country,
        industry: this.state.industry,
        password: this.state.password
      },
      headers: {
        "content-type": "application/json"
      }
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleChangeOfInputFields (event) {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChangeOfInputName (event) {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value });
  }

  toggleModal() {
    this.setState({successModal: false});
  }

  handleSubmit(){
    this.setState({
      successModal: true
    });
  }

  openLoginModal(){
    this.setState({loginScreenOpen: true})
  }

  closeLoginModal() {
    this.setState({loginScreenOpen: false})
  }

  render() {
    return (
      <div style={{ maxWidth: "700px" , maxHeight: "500px"}}>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>Name</Label>
              <Input type="text" name="name" id="name"  onChange={this.handleChangeOfInputName} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Gender</Label>
              <Input type="select" name="gender" id="exampleSelect"  onChange={this.handleChangeOfInputFields}>
                <option>Male</option>
                <option>Female</option>
                <option>Would Not Like To Reveal</option>

              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Industry</Label>
              <Input type="select" name="industry" id="exampleSelect" onChange={this.handleChangeOfInputFields}>
                <option>Fashion</option>
                <option>Photography</option>
                <option>Food</option>
                <option>Travel</option>
                <option>Blogging</option>
                <option>Vlogging</option>
                <option>Poetry</option>
                <option>Others</option>
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input type="email" name="email" id="email" onChange={this.handleChangeOfInputFields} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="exampleDate">Date</Label>
              <Input
                type="date"
                name="dob"
                id="exampleDate"
                placeholder="date placeholder"
                onChange={this.handleChangeOfInputName}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>City</Label>
              <Input type="text" name="city" id="firstName" onChange={this.handleChangeOfInputFields} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Country</Label>
              <Input type="text" name="country" id="firstName" onChange={this.handleChangeOfInputFields}/>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="passwordFirst"
                id="examplePassword1"
                placeholder="********"
                onChange={this.handleChangeOfInputFields}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Re-enter Password</Label>
              <Input
                type="password"
                name="passwordSecond"
                id="examplePassword2"
                placeholder="********"
                onChange={this.handleChangeOfInputFields}
                valid={(this.state.passwordFirst === this.state.passwordSecond) && this.state.passwordFirst !== ''}
                invalid={this.state.passwordSecond !== this.state.passwordFirst}
              />
              <FormFeedback invalid>Passwords do not match</FormFeedback>
            </FormGroup>
          </Col>
          <Col>
            <Button color="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
            <_Link to ="/"> <Button color="secondary">Cancel</Button></_Link>
          </Col>
        </Form>
        <Modal isOpen={this.state.successModal}>
          <ModalHeader>Success!</ModalHeader>
          <ModalBody>
            Yayy! You have registered successfully
          </ModalBody>
          <ModalFooter>
          <Button color="primary" onClick={this.openLoginModal}>Take me to Login!</Button>
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.loginScreenOpen} >
          <ModalHeader>Login</ModalHeader>
          <ModalBody>
          {this.state.loginScreenOpen ? <LoginModal /> : null}
          </ModalBody>
          <ModalFooter>
          <Button color="primary" onClick={this.toggleLoginScreen}>Login</Button>
            <Button color="secondary" onClick={this.closeLoginModal}>Cancel</Button>
          </ModalFooter>
        </Modal>

      </div>
    );
  }
}

export default RegisterModal;
