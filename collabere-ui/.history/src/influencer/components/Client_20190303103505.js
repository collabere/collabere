import React from "react";
import { List, Avatar} from "antd";

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
          <List.Item.Meta
            // avatar={<Avatar src={item.avatar} />}
            title= {item.name}
            
            description={item.email}
          />
          console.log(item)
          {item.city}
        </List.Item>
      )}
    />
  );
};

export default Client;