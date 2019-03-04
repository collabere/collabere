import React from "react";
import { List, Avatar,Card,Button} from "antd";

const Client = props => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 2
      }}
      dataSource={props.data}
      renderItem={item => (
        <List.Item >
          <div style={{ background: '#800080	', padding: '30px' }}>
           <Card title={item.name} bordered={false} style={{ width: 300 }}>
                  <p>{item.email}</p>
                  <p>{item.city}</p>
                  <p>{item.country}</p>
            </Card>
            <br/>
            <div>
              <Button type="primary">Conversations</Button>
            </div>
          </div>

      </List.Item>
      )}
    />
  );
};

export default Client;
