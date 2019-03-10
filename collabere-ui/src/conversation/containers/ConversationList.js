import React from "react";
import axios from "axios";
import Conversation from "../components/Conversation";



class ConversationList extends React.Component {
  state = {
    conversations: []
  };

  fetchMessages = () => {
    axios.get("http://127.0.0.1:8000/messages/v1/").then(res => {
      this.setState({
        conversations: res.data
      });
    });
  }

  componentDidMount() {
    this.fetchMessages();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token) {
      this.fetchMessages();      
    }
  }

  render() {
    return (
      <div>
        <Conversation data = {this.state.conversations} /> <br />
      </div>
    );

  }
}

export default ConversationList;