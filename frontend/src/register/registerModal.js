import React from "react";
import Col from 'reactstrap/lib/Col';
import Form from 'reactstrap/lib/Form';
import FormGroup from 'reactstrap/lib/FormGroup';
import Label from 'reactstrap/lib/Label';
import Input from 'reactstrap/lib/Input';
import Button from 'reactstrap/lib/Button';
import axios from "axios";

class RegisterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      dob: "",
      gender: "",
      city: "",
      country: "",
      industry: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCredentialSubmit = this.handleCredentialSubmit.bind(this);
  }

  handleSubmit() {
    console.log("handlesubmit called......");
    this.setState({
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      gender: document.getElementById('genderSelect').value,
      industry: document.getElementById('industrySelect').value,
      email: document.getElementById('email').value,
      dob: document.getElementById('dob').value,
      city: document.getElementById('city').value,
      country: document.getElementById('country').value,
      password: document.getElementById('password1').value,
    });
    console.log(this.state);
    this.handleCredentialSubmit();
  }

  handleCredentialSubmit() {
    console.log()
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/influencer/register/",
      data: {
        name: this.state.firstName.concat(this.state.lastName),
        email: this.state.email,
        username: this.state.username,
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

  render() {
    return (
      <div style={{ maxWidth: "700px" }}>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>First Name</Label>
              <Input type="text" name="firstName" id="firstName" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Last Name</Label>
              <Input type="text" name="lastName" id="lastName" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Gender</Label>
              <Input type="select" name="select" id="genderSelect">
                <option>Male</option>
                <option>Female</option>
                <option>Would Not Like To Reveal</option>
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Industry</Label>
              <Input type="select" name="select" id="industrySelect">
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
              <Input type="email" name="email" id="email" />handleSubmit
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="exampleDate">Date of birth</Label>
              <Input
                type="date"
                name="date"
                id="dob"
                placeholder="date placeholder"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>City</Label>
              <Input type="text" name="city" id="city"/>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Country</Label>
              <Input type="text" name="country" id="country"/>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="password1"
                placeholder="********"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Re-enter Password</Label>
              <Input
                type="password"
                name="password"
                id="password2"
                placeholder="********"
              />
            </FormGroup>
          </Col>
          <Col>
            <Button color="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
            <Button color="secondary">Cancel</Button>
          </Col>
        </Form>
      </div>
    );
  }
}

export default RegisterModal;
