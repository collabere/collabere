import { Component } from "react";
import React from "react";
import Button from "@material-ui/core/Button";

require("../styles/ConversationScreen.css");

const FILE_UPLOAD_PREFIX = "https://torquerf1.s3.ap-south-1.amazonaws.com/";

function returnParsedDateString(serverDateString) {
  var array = serverDateString.split("T");
  var date = array[0];
  var time = array[1].split(".")[0];
  let timeArray = time.split(":");
  let finalTime = timeArray[0].concat(":").concat(timeArray[1]);
  return finalTime.concat(",").concat(date);
}

class Messages extends Component {
  render() {
    const { messages } = this.props;
    return (
      <ul className="Messages-list">
        {messages.map(m => this.renderMessage(m))}
      </ul>
    );
  }

  checkForFileLink = string => {
    return string.startsWith(FILE_UPLOAD_PREFIX);
  };

  renderMessage(messageObject) {
    const { timestamp, message } = messageObject;
    const className = messageObject.fromInfluencer
      ? "Messages-message currentMember"
      : "Messages-message";
    return (
      <li className={className}>
        <div className="Message-content">
          {this.checkForFileLink(message) ? (
            <Button
              variant="outlined"
              color="secondary"
              href={message}
              target="_blank"
            >
              {message.replace(FILE_UPLOAD_PREFIX, "")}
            </Button>
          ) : (
            <div className="text">{message}</div>
          )}
          <p className="timestamp">{returnParsedDateString(timestamp)}</p>
        </div>
      </li>
    );
  }
}

export default Messages;
