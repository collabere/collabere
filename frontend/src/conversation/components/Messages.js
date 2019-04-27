import React from "react";

import Message from './Message.js';

export class Messages extends React.Component {

    // componentDidUpdate() {
    //     // There is a new message in the state, scroll to bottom of list
    //     const objDiv = document.getElementById('messageList');
    //     objDiv.scrollTop = objDiv.scrollHeight;
    //   }
    
    render() {
        // Loop through all the messages in the state and create a Message component
        const messages = this.props.messages.map((message, i) => {
            return (
                <div>
              <Message
                key={i}
                clientName={message.responderId}
                message={message.message}
                influencerName={message.reciverId}
                fromInfluencer={true} />
                </div>
            );
          });


        return (
            <div>
            { messages }
            </div>
        );
      }
    }
    Messages.defaultProps = {
        messages: []
      };
      
export default Messages;  

