import React from "react";
import axios from "axios";
import { Navbar, FormControl, Nav, Form } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import * as MaterialUiLibrary from "@material-ui/core";
import * as Antd from "antd";

import { List, Avatar, Card } from "antd";
import { Link } from "react-router-dom";

import { message, Spin } from "antd";

import InfiniteScroll from "react-infinite-scroller";
import { Menu, Dropdown, Input } from "antd";

import UpdateModal from "./Profile-update-modal-dialogue";
import ClientInfoModal from "./Client-info-modal";
import { IconButton, Icon } from "@material-ui/core";
import SideNavMenu from "./Side-nav-menu";
import { local, dev } from "../../config/envConfig";


const Search = Input.Search;

class ClientScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      loading: false,
      hasMore: true,
      updatModalOpen: false,
      colour: "#FFFFFF",
      currentListItem: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSortAplphabetically = this.handleSortAplphabetically.bind(this);
    this.handleSortByStartingDates = this.handleSortByStartingDates.bind(this);
    this.url = process.env.NODE_ENV === undefined ? local.url : dev.url;
  }

  fetchArticles = () => {
    const {
      match: { params }
    } = this.props;

    axios
      .get(
        `/project/byInfluencerUserName/${
          params.influencerUsername
        }`,
        {}
      )
      .then(res => {
        console.log(res);
        this.setState({
          clients: res.data
        });
      });
  };

  handleInfiniteOnLoad = () => {
    let data = this.state.clients;
    this.setState({
      loading: true
    });
    if (data.length > 14) {
      message.warning("Infinite List loaded all");
      this.setState({
        hasMore: false,
        loading: false
      });
      return;
    }
  };
  componentDidMount() {
    this.fetchArticles();
  }

  handleClickConversationsButton = () => {
    this.props.history.push("/messages");
  };

  componentWillReceiveProps(newProps) {
    if (newProps.token) {
      this.fetchArticles();
    }
  }

  onClickSettingsButton = () => {
    this.setState({ updatModalOpen: true });
  };

  handleChange(e) {
    let currentList = [];
    let newList = [];
    if (e.target.value !== "") {
      currentList = this.state.clients;
      newList = currentList.filter(client => {
        const clientNameLoweCase = client.clientName.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return clientNameLoweCase.includes(filter);
      });
    } else {
      this.fetchArticles();
    }
    this.setState({
      clients: newList
    });
  }

  handleSortAplphabetically() {
    let sortedList = this.state.clients;
    sortedList.sort(function(a, b) {
      var textA = a.clientName.toUpperCase();
      var textB = b.clientName.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    this.setState({
      clients: sortedList
    });
  }

  handleSortByStartingDates() {
    let sortedList = this.state.clients;
    sortedList.sort(function(a, b) {
      var dateA = Date.parse(a.projectInitiationDate);
      var dateB = Date.parse(b.projectInitiationDate);
      return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
    });
    this.setState({
      clients: sortedList.reverse()
    });
  }

  onHover = date => {
    this.setState({ currentListItem: date });
  };

  onHoverOut = () => {
    this.setState({ currentListItem: "#ffffff" });
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <UpdateModal />
        </Menu.Item>
        <Menu.Item>
          <Button color="primary">Logout</Button>
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Navbar expand="lg" style={{ backgroundColor: "#40e0d0" }}>
          <SideNavMenu
            influencerUsername={this.props.match.params.influencerUsername}
          />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
            <Form inline>
              <Search
                placeholder="Search Client"
                onChange={this.handleChange}
                style={{ width: 200 }}
              />
              <Dropdown overlay={menu} placement="topLeft">
                <Button color="#000000">
                  <Icon>settings</Icon>
                </Button>
              </Dropdown>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <div style={{ maxWidth: "35%", margin: "auto" }}>
          <Antd.Button onClick={this.handleSortAplphabetically}>
            Sort Alphabetically
          </Antd.Button>
          <Antd.Button onClick={this.handleSortByStartingDates}>
            Sort By Starting Date
          </Antd.Button>
          <Antd.Button onClick={this.handleSortAplphabetically}>
            Sort By Stuff
          </Antd.Button>
          <hr />

          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
          >
            <List
              dataSource={this.state.clients}
              renderItem={item => (
                <div
                  style={{
                    backgroundColor:
                      this.state.currentListItem === item.projectInitiationDate
                        ? "#ebebeb"
                        : "#FFFFFF"
                  }}
                  onMouseOver={() => this.onHover(item.projectInitiationDate)}
                  onMouseOut={() => this.onHover()}
                >
                  <Link
                    to={`/messages/${
                      this.props.match.params.influencerUsername
                    }/${item.clientId}/${item.projectInitiationDate}`}
                  >
                    <a>
                      <List.Item key={item.id}>
                        <List.Item.Meta
                          avatar={
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                          }
                          title={
                            <Antd.Button
                              style={{
                                fontSize: "medium",
                                backgroundColor: "#b266ff",
                                borderColor: "#b266ff",
                                borderRadius: "20px"
                              }}
                              type="primary"
                            >
                              {item.clientName}
                            </Antd.Button>
                          }
                        />
                        <p>Date Started: {item.projectInitiationDate}</p>
                      </List.Item>
                    </a>
                  </Link>
                  <p>{item.introText}</p>

                  <hr />
                </div>
              )}
            >
              {this.state.loading && this.state.hasMore && (
                <div className="demo-loading-container">
                  <Spin />
                </div>
              )}
            </List>
          </InfiniteScroll>
        </div>
        <hr />
        <div className="demo-infinite-container" />
      </div>
    );
  }
}

export default ClientScreen;
