import React from "react";
import axios from "axios";
import Messages from "./Messages.js";
import ChatBox from "./ChatBox.js";
import SideNavMenu from "../../influencer/components/Side-nav-menu.js";
import { local, dev } from "../../config/envConfig";
import { Navbar, FormControl, Nav, Form } from "react-bootstrap";
import LinearProgress from '@material-ui/core/LinearProgress';
require("../styles/ConversationScreen.css");



class ConversationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.url = process.env.NODE_ENV === undefined ? local.url : dev.url;
  }
  state = {
    messages: [],
    isLoading: false
  };

  componentDidMount() {
    this.fetchLatestClientEmailAndMessages();
  }
  sendHandler = message => {
    this.setState({isLoading: true})
    const {
      match: { params }
    } = this.props;
    axios({
      method: "post",
      url: `/messages/insert_message/`,
      data: {
        influencerUsername: params.influencerUsername,
        clientId: params.clientId,
        message: message,
        projectInitiationDate: params.projectInitiationDate,
        fromInfluencer: true
      },
      headers: {
        "content-type": "application/json"
      }
    }).then(response => {
      console.log(response);
      const messageObject = {
        message
      };
      messageObject.fromInfluencer = true;
    this.addMessage(messageObject);
    this.setState({isLoading: false})

    });

  };

  addMessage = message => {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  };

  fetchMessages = () => {
    const {
      match: { params }
    } = this.props;
    axios
      .get(`/messages/chat_messages`, {
        params: {
          projectInitiationDate: params.projectInitiationDate
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          messages: res.data
        });
      });
  };

  fetchLatestClientEmailAndMessages = () => {
    const {
      match: { params }
    } = this.props;
    axios
      .get(`/messages/insert_client_reply`, {
        params: {
          projectInitiationDate: params.projectInitiationDate
        }
      })
      .then(res => {
       this.fetchMessages()
      });
  };

  render() {
    return (
      <div>
       <Navbar expand="lg" style={{ backgroundColor: "#40e0d0" }}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div
          className="container"
          style={{ maxWidth: "75%", margin: "auto" }}
        >
          <Messages messages={this.state.messages} />
          {this.state.isLoading ? (<LinearProgress />) : null}
          <ChatBox onSend={this.sendHandler} />
        </div>
      </div>
    );
  }
}

export default ConversationScreen;
