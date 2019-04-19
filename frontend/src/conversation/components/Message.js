import React from 'react';

export class Message extends React.Component {
  render() {
    // Was the message sent by the current user. If so, add a css class
    const fromInfluencer = this.props.fromInfluencer ? 'from-me' : '';

    return (
      <div className={`message ${fromInfluencer}`}>
        <div className='username'>
          { this.props.influencerName }
        </div>
        <div className='message-body'>
          { this.props.message }
        </div>
      </div>
    );
  }
}

Message.defaultProps = {
  message: '',
  influencerName: '',
  fromInfluencer: false
};

export default Message;