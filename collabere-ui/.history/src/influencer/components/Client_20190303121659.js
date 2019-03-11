import React from "react";
import { List, Avatar,Card} from "antd";

const Client = props => {
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
        <List.Item >
          
          console.log(item)
          
          <div style={{ background: '#ECECEC', padding: '30px' }}>
           <Card title={item.name} bordered={false} style={{ width: 300 }}>
                  <p>{item.email}</p>
                  <p>{item.city}</p>
                  <p>{item.country}</p>
            </Card>
          </div>
      </List.Item>
      )}
    />
  );
};

export default Client;