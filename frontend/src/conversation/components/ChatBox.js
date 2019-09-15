import {Component} from "react";
import React from "react";
require("../styles/ConversationScreen.css");


class ChatBox extends Component {
  state = {
    text: ""
  }

  onChange(e) {
    this.setState({text: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({text: ""});
    this.props.onSend(this.state.text);
  }

  render() {
    return (
      <div className="input">
        <form style={{display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  maxWidth: '900px',
  margin: '0 auto 40px'}} onSubmit={e => this.onSubmit(e)}>
          <input
            onChange={e => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Enter your message and press ENTER"
            autofocus="true"
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default ChatBox;