import { Component } from "react";
import React from "react";

require("../styles/ConversationScreen.css");

class Messages extends Component {
  render() {
    const { messages } = this.props;
    return (
      <ul className="Messages-list">
        {messages.map(m => this.renderMessage(m))}
      </ul>
    );
  }

  renderMessage(messageObject) {
    const { timestamp, message } = messageObject;
    // const messageFromMe = member.id === currentMember.id;
    const className = messageObject.fromInfluencer
      ? "Messages-message currentMember"
      : "Messages-message";
    return (
      <li className={className}>
        <div className="Message-content">
          <div className="text">{message}</div>
        </div>
      </li>
    );
  }
}

export default Messages;
