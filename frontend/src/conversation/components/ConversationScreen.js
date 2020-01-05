import React from "react";
import axios from "axios";
import Messages from "./Messages.js";
import ChatBox from "./ChatBox.js";
import { local, dev } from "../../config/envConfig";
import LinearProgress from "@material-ui/core/LinearProgress";
import InboxNavbar from "../../influencer/components/Navbar";
import { Spin } from "antd";
import { toast } from "react-toastify";

require("../styles/ConversationScreen.css");
toast.configure();

class ConversationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.url = process.env.NODE_ENV === undefined ? local.url : dev.url;
  }
  state = {
    messages: [],
    isLoading: false,
    messagesLoadingFlag: true
  };

  notifyOnSuccess = () => {
    toast.success("Message sent successfully to the client", {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  notifyOnFailure = () => {
    toast.error("Unable to send message to the client", {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  componentDidMount() {
    this.fetchLatestClientEmailAndMessages();
  }

  sendHandler = message => {
    this.setState({ isLoading: true });
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
        "content-type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(response => {
        console.log(response);
        const messageObject = {
          message
        };
        messageObject.fromInfluencer = true;
        this.addMessage(messageObject);
        this.setState({ isLoading: false });
        this.notifyOnSuccess();
      })
      .catch(error => {
        this.notifyOnFailure();
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
        },
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          messages: res.data,
          messagesLoadingFlag: false
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
        },
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(() => {
        this.fetchMessages();
      });
  };

  render() {
    const {
      match: { params }
    } = this.props;
    return (
      <div>
        <InboxNavbar
          influencerUsername={this.props.match.params.influencerUsername}
          showSearchBar={false}
        />

        <div className="App" style={{ maxWidth: "100%", margin: "auto" }}>
          <Messages messages={this.state.messages} />
          {this.state.isLoading ? <Spin size="large" /> : null}
          {this.state.messagesLoadingFlag ? <Spin size="large" /> : null}
          <ChatBox
            onSend={this.sendHandler}
            appendMessage={this.addMessage}
            influencerUsername={params.influencerUsername}
            clientId={params.clientId}
            projectInitiationDate={params.projectInitiationDate}
          />
        </div>
      </div>
    );
  }
}

export default ConversationScreen;
