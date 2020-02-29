import React, { useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogActions";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { toast } from "react-toastify";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
toast.configure();

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
  const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);

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
      .then(() => {
        toast.success("Links removed successfully!", {
          position: toast.POSITION.TOP_RIGHT
        });
        modifyItems(getReferralListObjects(returnLinks().join(",")));
        setConfirmDeleteOpen(false);
      })
      .catch(function() {
        toast.success(
          "There was some problem removing the Links ,please try again later!",
          {
            position: toast.POSITION.TOP_RIGHT
          }
        );
      });
  };

  const listItems = items.map(item => {
    return (
      <ListItem>
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
        <a onClick={() => window.open(item.link, "_blank")}>{item.link}</a>
      </ListItem>
    );
  });

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
      <h3 style={{ margin: "16px 0" }}>Referrals</h3>
      {items.length === 0 ? (
        <p style={{ color: "red" }}>No links have been added! </p>
      ) : (
        <List component="nav">{listItems}</List>
      )}

      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText style={{ fontSize: "1.5rem" }}>
            Are you sure ,you want to delete the selected links?
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
