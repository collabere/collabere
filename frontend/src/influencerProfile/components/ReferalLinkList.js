import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ListItemIcon from "@material-ui/core/ListItemIcon";

export default function ReferalLinkList(props) {
  const listItems = props.referals.split(",").map(item => {
    return (
      <ListItem button>
        <ListItemIcon>
          <ArrowRightIcon />
        </ListItemIcon>
        {item}
      </ListItem>
    );
  });

  return (
    <div>
      <h3 style={{ margin: "16px 0" }}>Referal Links</h3>
      <List component="nav">{listItems}</List>
    </div>
  );
}
