import React, { useEffect } from "react";
import { List, Typography } from "antd";


export default function ReferalLinkList(props) {
  
  return (
    <div>
      <h3 style={{ margin: "16px 0" }}>Referal Links</h3>
      <List
        size="small"
        bordered
        dataSource={props.referals.split(",")}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
    </div>
  );
}
