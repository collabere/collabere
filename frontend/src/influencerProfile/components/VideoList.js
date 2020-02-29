import React, { useEffect } from "react";
import { List, Typography } from "antd";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogActions";
import { toast } from "react-toastify";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
toast.configure();

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
  if (links) {
    links.split(",").forEach(element => {
      var obj = {};
      obj["link"] = element;
      obj["checked"] = false;
      videoObjectList.push(obj);
    });
  }

  return videoObjectList;
}
export default function VideoList({ influencerUsername, links }) {
  const [items, modifyItems] = React.useState(getVideoListObjects(links));
  const [urlTitleMap, setUrlTitleMap] = React.useState({});
  const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);

  useEffect(() => {
    async function processMapWithTitle() {
      let urlArray = links.split(",");
      let map = {};
      for (let i = 0; i < urlArray.length; i++) {
        const response = await getVideoTitlePromise(urlArray[i]);
        map[urlArray[i]] = response.data.items[0].snippet.title;
      }
      setUrlTitleMap(map);
    }
    processMapWithTitle();
  }, []);

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

  const getVideoTitlePromise = videoUrl => {
    const videoId = getId(videoUrl);
    let videoTitle = "";
    let config = {
      params: {
        key: "AIzaSyAVUVVKZISe5zlCPL_xuTjVKLmZfwpyCwY",
        part: "snippet",
        id: videoId
      }
    };
    return axios.get("https://www.googleapis.com/youtube/v3/videos", config);
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
    obj["videoLink"] =
      returnLinks().length === 0 ? null : returnLinks().join(",");
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
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    })
      .then(() => {
        toast.success("Videos removed successfully!", {
          position: toast.POSITION.TOP_RIGHT
        });
        modifyItems(getVideoListObjects(returnLinks().join(",")));
        setConfirmDeleteOpen(false);
      })
      .catch(function() {
        toast.success(
          "There was some problem removing the videos ,please try again later!",
          {
            position: toast.POSITION.TOP_RIGHT
          }
        );
      });
  };

  return (
    <div>
      {localStorage.getItem("token") && (
        <Button
          style={{ float: "right" }}
          color="secondary"
          onClick={() => setConfirmDeleteOpen(true)}
          disabled={
            items.length === items.filter(item => item.checked === false).length
          }
        >
          Delete Selected
        </Button>
      )}
      <h3 style={{ margin: "16px 0" }}>Videos</h3>
      {items.length === 0 ? (
        <p style={{ color: "red" }}>No videos have been added! </p>
      ) : (
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
              <p style={{ fontSize: "1.5rem", paddingLeft: "1rem" }}>
                {urlTitleMap[item.link]}
              </p>
              {localStorage.getItem("token") && (
                <Checkbox
                  checked={item.checked}
                  value="dd"
                  onChange={handleChange(item)}
                  inputProps={{
                    "aria-label": "primary checkbox"
                  }}
                />
              )}
            </List.Item>
          )}
        />
      )}
      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText style={{ fontSize: "1.5rem" }}>
            Are you sure ,you want to delete the selected videos?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
            cancel
          </Button>
          <Button
            style={{ color: "red" }}
            onClick={handleDeleteButtonClick}
            color="primary"
            autoFocus
          >
            delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
