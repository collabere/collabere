import React from "react";
import axios from "axios";
import { Navbar, Button, FormControl, Nav, Form } from "react-bootstrap";
import { List, Avatar, Card } from "antd";
import { Link } from "react-router-dom";

import { message, Spin } from "antd";

import InfiniteScroll from "react-infinite-scroller";
import { Menu, Dropdown } from "antd";

import UpdateModal from "./Profile-update-modal-dialogue";
import ClientInfoModal from "./Client-info-modal";

class ClientScreen extends React.Component {
  state = {
    clients: [],
    loading: false,
    hasMore: true,
    updatModalOpen: false
  };

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

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <UpdateModal />
        </Menu.Item>
        <Menu.Item>
          <Button style={{ height: "32px" }} type="secondary">
            Logout
          </Button>
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Navbar className="bg-dark justify-content-between">
        <Navbar.Brand href="#home" style={{color:'#FFFFFF'}}>Collabere</Navbar.Brand>
          <Form inline />
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
             <Dropdown overlay={menu} placement="topLeft">
              <Button>Settings</Button>
            </Dropdown>
          </Form>
        </Navbar>
        <br/>
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
                <div>
                  <List.Item
                    key={item.id}
                    style={{ backgroundColor: "#FFDAB9" }}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={<p style={{ fontSize: "large" }}>{item.name}</p>}
                      content={<p>{item.name}</p>}
                    />

                    <Link to="/messages">
                      <Button
                        style={{
                          height: "35px",
                          backgroundColor: "#FF0000",
                          borderColor: "#FF0000"
                        }}
                      >
                        Conversations
                      </Button>
                    </Link>
                  </List.Item>
                  <div style={{ backgroundColor: "#FFDAB9" }}>
                    {" "}
                    <ClientInfoModal email={item.email} />{" "}
                  </div>
                  <p />
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
