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
      handle: "",
      dob: "",
      gender: "",
      city: "",
      country: "",
      industry: "",
      password: ""
    };
  }

  handleCredentialSubmit() {
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/influencer/login/",
      data: {
        name: this.state.firstName.concat(this.state.lastName),
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
              <Input type="select" name="select" id="exampleSelect">
                <option>Male</option>
                <option>Female</option>
                <option>Would Not Like To Reveal</option>
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Industry</Label>
              <Input type="select" name="select" id="exampleSelect">
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
              <Input type="email" name="email" id="email" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="exampleDate">Date</Label>
              <Input
                type="date"
                name="date"
                id="exampleDate"
                placeholder="date placeholder"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>City</Label>
              <Input type="text" name="firstName" id="firstName" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Country</Label>
              <Input type="text" name="firstName" id="firstName" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword1"
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
                id="examplePassword2"
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
