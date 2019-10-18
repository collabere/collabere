import React, { useEffect } from "react";
import { List, Typography } from "antd";

function getId(url) {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return "error";
  }
}
export default function VideoList(props) {
  return (
    <div>
      <h3 style={{ margin: "16px 0" }}>Videos</h3>
      <List
        size="small"
        bordered
        dataSource={props.links.split(",")}
        renderItem={item => (
          <List.Item style={{backgroundColor: '#DCDCDC'}}>
            <iframe
              src={"//www.youtube.com/embed/" + getId(item)}
              frameborder="0"
              allowfullscreen
            ></iframe>
          </List.Item>
        )}
      />
    </div>
  );
}
