import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { Link } from "react-router-dom";


const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

class SideNavMenu extends React.Component {
  state = {
    left: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <Link to="/clients/">
            <ListItem button key="Inbox">
              <ListItemText primary="Inbox" />
            </ListItem>
          </Link>
          <ListItem button key="Metrics">
            <ListItemText primary="Metrics" />
          </ListItem>
          <ListItem button key="About Us">
            <ListItemText primary="About Us" />
          </ListItem>
          <ListItem button key="Help">
            <ListItemText primary="Help" />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div>
        <Button onClick={this.toggleDrawer("left", true)}>MENU</Button>

        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

SideNavMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SideNavMenu);
