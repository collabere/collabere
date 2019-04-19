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




const Search = Input.Search;

class ClientScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      loading: false,
      hasMore: true,
      updatModalOpen: false,
      colour: '#FFFFFF',
      currentListItem: ''

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSortAplphabetically = this.handleSortAplphabetically.bind(this);
  


  }

  fetchArticles = () => {
    axios.get("http://127.0.0.1:8000/influencer/v1/clients/1").then(res => {
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
        const clientNameLoweCase = client.name.toLowerCase();
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

  handleSortAplphabetically ()  {
    console.log("ddddddd");
    let sortedList = this.state.clients;
    sortedList.sort(function(a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    this.setState({
      clients: sortedList
    });
  }

  onHover = (name) => {
    console.log(name);
    this.setState({ currentListItem: name });
}

onHoverOut = () => {
  this.setState({ currentListItem: '#ffffff' });
}


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
        <nav class="navbar navbar-light" style={{ backgroundColor: "#00ffff" }}>
        <SideNavMenu/>
          {/* <a class="navbar-brand">Collabere</a> */}
          <Search
            placeholder="Search Client"
            onChange={this.handleChange}
            style={{ width: 200 }}
          />
          <form class="form-inline">
            <Dropdown overlay={menu} placement="topLeft">
              <Button color="#000000">SETTNGS</Button>
            </Dropdown>
          </form>
        </nav>
      <div style={{ maxWidth: "800px", marginLeft: "680px" }}>
          <Antd.Button
            onClick={
              this.handleSortAplphabetically
            }
          >
            Sort Alphabetically
          </Antd.Button>
          <Antd.Button
            onClick={
              this.handleSortAplphabetically
            }
          >
            Sort By Recent Message
          </Antd.Button>
          <Antd.Button
            onClick={
              this.handleSortAplphabetically
            }
          >
            Sort By Stuff
          </Antd.Button>
        </div>

        <hr />
        <div className="demo-infinite-container">
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
                <div  style={{ maxWidth: "800px", marginLeft: "500px", backgroundColor: this.state.currentListItem === item.name? '#ebebeb': '#FFFFFF'}} onMouseOver={()=>this.onHover(item.name)} onMouseOut={()=>this.onHover()}>
                  <Link to="/messages">
                    <a>
                      <List.Item key={item.id} >
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
                              {item.name}
                            </Antd.Button>
                          }
                          content={<p>{item.name}</p>}
                        />
                      </List.Item>
                    </a>
                  </Link>
                  <div>
                    <ClientInfoModal email={item.email} />{" "}
                  </div>
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
      </div>
    );
  }
}

export default ClientScreen;
