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
        <List.Item
          key={item.name}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          
          console.log(item)
          
          <div style={{ background: '#ECECEC', padding: '30px' }}>
           <Card title="Card title" bordered={false} style={{ width: 300 }}>
                  <p>{item.name}</p>
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
