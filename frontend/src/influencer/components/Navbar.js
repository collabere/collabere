import React, { Component } from "react";

import * as MaterialUiLibrary from "@material-ui/core";
import { Link as _Link } from "react-router-dom";
import collabere from "../../../images/collabere.png";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Menu, Dropdown, Input } from "antd";
import UpdateModal from "./Profile-update-modal-dialogue";
import UpdatePublicProfileModal from "./Public-details-update-modal";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import SideNavMenu from "./Side-nav-menu";
import PaymentModal from "../../payment/components/PaymentModal";

class InboxNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSortMenuOpen: false,
      anchorEl: null,
      searchFieldValue: ""
    };
  }

  handleSearchByName = event => {
    this.setState({ searchFieldValue: event.target.value }, function() {
      this.props.handleSearch(this.state.searchFieldValue);
    });
  };

  handleLogout() {
    console.log("logout called.");
    localStorage.clear();
  }

  render() {
    const rootStyle = {
      flexGrow: 1
    };

    const appBarStyle = {
      backgroundColor: "#7e0015",
      height: "3.5rem"
    };

    const typographyStyle = {
      flexGrow: 1,
      fontSize: 50,
      fontStyle: "italic",
      fontWeight: 400,
      fontFamily: "auto"
    };

    const toolbarStyle = {
      textAlign: "center"
    };
    const { influencerUsername } = this.props;

    const menu = (
      <Menu>
        <Menu.Item>
          <UpdateModal influencerUsername={influencerUsername} />
        </Menu.Item>
        <Menu.Item>
          <UpdatePublicProfileModal influencerUsername={influencerUsername} />
        </Menu.Item>
        <Menu.Item>
          <Link
            style={{ textDecoration: "none" }}
            to={{ pathname: `/profile/${influencerUsername}` }}
          >
            <h6>SEE YOUR PORTFOLIO</h6>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <PaymentModal influencerUsername={influencerUsername} />
        </Menu.Item>

        <Menu.Item>
          <Link style={{ textDecoration: "none" }} to="/">
            {" "}
            <h6 onClick={this.handleLogout}>LOGOUT</h6>
          </Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <div style={rootStyle}>
        <MaterialUiLibrary.AppBar position="fixed" style={appBarStyle}>
          <MaterialUiLibrary.Toolbar style={toolbarStyle}>
            <SideNavMenu
              influencerUsername={this.props.influencerUsername}
              handleSearchByProjectName={this.handleSearchByName}
              showSearchBarField={this.props.showSearchBar}
            />
            <MaterialUiLibrary.Typography
              variant="h5"
              color="inherit"
              style={typographyStyle}
            >
              <img style={{ paddingBottom: "1rem" }} src={collabere} />
            </MaterialUiLibrary.Typography>
            <Dropdown overlay={menu} placement="topLeft" trigger={["click"]}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
                <Badge badgeContent={this.props.unreadMsg} color="error"></Badge>
              </IconButton>
            </Dropdown>
          </MaterialUiLibrary.Toolbar>
        </MaterialUiLibrary.AppBar>
      </div>
    );
  }
}
export default InboxNavbar;
