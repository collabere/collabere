import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Input } from "antd";

import { Link } from "react-router-dom";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

const Search = Input.Search;

class SideNavMenu extends React.Component {
  state = {
    left: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  handleSideNavSearchByProjectName = event => {
    this.props.handleSearchByProjectName(event);
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          {this.props.showSearchBarField &&
          <ListItem button key="Metrics">
          <Search
            placeholder="Search Client"
            style={{ width: 300 }}
            onChange={this.handleSideNavSearchByProjectName}
          />{" "}
        </ListItem>
       }

        <Link to={`/clients/${this.props.influencerUsername}`} style={{textDecoration: 'none'}}>
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
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={this.toggleDrawer("left", true)}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div tabIndex={0} role="button">
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
