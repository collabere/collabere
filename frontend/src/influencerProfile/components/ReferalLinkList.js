import React, { useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogActions";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

function getReferralListObjects(links) {
  var referralObjectList = [];
  if (links) {
    links.split(",").forEach(element => {
      var obj = {};
      obj["link"] = element;
      obj["checked"] = false;
      referralObjectList.push(obj);
    });
  }
  debugger;
  return referralObjectList;
}
export default function ReferalLinkList({ influencerUsername, referrals }) {
  const [items, modifyItems] = React.useState(
    getReferralListObjects(referrals)
  );
  const [succesModalVisible, setSuccessModalVisible] = React.useState(false);

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
    obj["referralLink"] =
      returnLinks().length === 0 ? null : returnLinks().join(",");
    obj["username"] = influencerUsername;
    return obj;
  };

  const handleSuccessModalClose = () => {
    setSuccessModalVisible(false);
    window.location.reload();
  };
  const handleDeleteButtonClick = () => {
    axios({
      method: "put",
      url: `/influencer/update_public_details`,
      data: constructObjectToPost(),
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(response => {
        console.log(response);
        setSuccessModalVisible(true);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const listItems = items.map(item => {
    return (
      <ListItem button onClick={() => window.open(item.link, "_blank")}>
        <ListItemIcon>
          <ArrowRightIcon />
        </ListItemIcon>
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
        {item.link}
      </ListItem>
    );
  });

  return (
    <div>
      {localStorage.getItem("token") && (
        <Button
          style={{ float: "right" }}
          color="secondary"
          onClick={handleDeleteButtonClick}
          disabled={
            items.length === items.filter(item => item.checked === false).length
          }
        >
          Delete Selected
        </Button>
      )}
      <h3 style={{ margin: "16px 0" }}>Referrals</h3>
      {items.length === 0 ? (
        <p style={{ color: "red" }}>No links have been added! </p>
      ) : (
        <List component="nav">{listItems}</List>
      )}

      <Dialog
        open={succesModalVisible}
        onClose={handleSuccessModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Selected Referrals have been removed successfully
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessModalClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
