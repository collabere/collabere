import { Timeline, Icon,Button,List,Avatar } from 'antd';
import React from "react";




const Conversation = props => {
    return (
        <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 3
        }}
        dataSource={props.data}
        renderItem={item => (
            <List.Item>
                 <div style={{ background: '#00FF00', padding: '30px' }}>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title="Message"
              description={item.message}
            />
            </div>
          </List.Item>
          
        )}
      />
    );
  };
  
  export default Conversation;
  

