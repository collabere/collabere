import React, { useEffect } from "react";
import { List, Typography } from "antd";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import axios from "axios";

function getId(url) {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return "error";
  }
}

function getVideoListObjects(links) {
  var videoObjectList = [];
  links.split(",").forEach(element => {
    var obj = {};
    obj["link"] = element;
    obj["checked"] = false;
    videoObjectList.push(obj);
  });
  return videoObjectList;
}
export default function VideoList({ influencerUsername, links }) {
  const [items, modifyItems] = React.useState(getVideoListObjects(links));

  const handleChange = item => event => {
    var newItems = [];
    items.forEach(obj => {
      if (obj.link === item.link) {
        obj.checked = event.target.checked;
      }
      newItems.push(obj);
      modifyItems(newItems);
    });
  };

  const returnLinks = () => {
    var linkString = [];

    for (var i = 0; i < items.length; i++) {
      if (!items[i].checked) {
        linkString.push(items[i].link);
      }
    }

    return linkString;
  };

  const constructObjectToPost = () => {
    var obj = {};
    obj["videoLink"] = returnLinks().join(",");
    obj["username"] = influencerUsername;
    return obj;
  };
  const handleDeleteButtonClick = () => {
    axios({
      method: "put",
      url: `/influencer/update_public_details`,
      data: constructObjectToPost(),
      headers: {
        "content-type": "application/json",
        Authorization: sessionStorage.getItem("token")
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Button
        style={{ float: "right" }}
        color="secondary"
        onClick={handleDeleteButtonClick}
      >
        Delete Selected
      </Button>
      <h3 style={{ margin: "16px 0" }}>Videos</h3>

      <List
        size="small"
        bordered
        dataSource={items}
        renderItem={item => (
          <List.Item style={{ backgroundColor: "#DCDCDC" }}>
            <iframe
              src={"//www.youtube.com/embed/" + getId(item.link)}
              frameborder="0"
              allowfullscreen
            ></iframe>
            <Checkbox
              checked={item.checked}
              value="dd"
              onChange={handleChange(item)}
              inputProps={{
                "aria-label": "primary checkbox"
              }}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
