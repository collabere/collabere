import React from "react";
import axios from "axios";
import Messages from "./Messages.js";
import ChatBox from "./ChatBox.js";
import SideNavMenu from "../../influencer/components/Side-nav-menu.js";
import {local , dev} from "../../config/envConfig";
require("../styles/ConversationScreen.css");

class ConversationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.url = (process.env.NODE_ENV === undefined) ? local.url : dev.url;
  }
  state = {
    message: [],
    
  };

  

  componentDidMount() {
    this.fetchMessages();
  }
  sendHandler = message => {
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
      },
      headers: {
        "content-type": "application/json"
      }
    }).then(response => {
      console.log(response);
      const messageObject = {
        message
      };

      messageObject.fromMe = true;
      this.addMessage(messageObject);
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
          influencer_username: params.influencerUsername,
          client_id: params.clientId
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          messages: res.data
        });
      });
  };

  render() {
    return (
      <div>
        <nav
          className="navbar navbar-light"
          style={{ backgroundColor: "#00ffff" }}
        >
          <SideNavMenu />
          <p style={{ marginRight: "950px" }}>Conversations</p>
        </nav>
        <div
          className="container"
          style={{ maxWidth: "800px", marginLeft: "500px" }}
        >
          <Messages messages={this.state.messages} />
          <ChatBox onSend={this.sendHandler} />
        </div>
      </div>
    );
  }
}

export default ConversationScreen;
