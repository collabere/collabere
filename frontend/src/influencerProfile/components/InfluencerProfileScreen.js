import React from "react";
// import { Tab } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import { useState, useEffect } from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { Navbar, FormControl, Nav, Form } from "react-bootstrap";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import EmailIcon from "@material-ui/icons/Email";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ProjectCreationScreen from "../../project/components/ProjectCreationScreen";
import VideoList from "./VideoList";
import axios from "axios";
import ReferalLinkList from "./ReferalLinkList";

export default function InfluencerProfileScreen(props) {
  useEffect(() => {
    axios
      .get(`/influencer/get_public_details`, {
        params: {
          username: props.match.params.influencerUsername
        },
        headers: {
          Authorization: sessionStorage.getItem("token")
        }
      })
      .then(res => {
        console.log(res.data);
        setData(res.data);
      });
  }, []);

  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div
      style={{
        margin: "1px auto 5% auto"
      }}
    >
      <Navbar expand="lg" style={{ backgroundColor: "#7e0015" }}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div style={{ backgroundColor: "#7e0015", height: "12rem" }}></div>

      <Paper style={{ flexGrow: "1" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab icon={<EmailIcon />} onClick={console.log("fff")} />
          <Tab icon={<CardGiftcardIcon />} />
          <Tab icon={<PlayArrowIcon />} />
        </Tabs>
      </Paper>
      {value === 0 && (
        <ProjectCreationScreen
          influencerUsername={props.match.params.influencerUsername}
        />
      )}
      {value === 1 && <VideoList links={data.videoLink} />}
      {value === 2 && <ReferalLinkList referals={data.referralLink} />}
    </div>
  );
}
