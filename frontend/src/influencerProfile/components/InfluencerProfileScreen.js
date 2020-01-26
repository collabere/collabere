import React, { useEffect } from "react";
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
import HomeNavBar from "../../homepage/components/Navbar";
import Avatar from "react-avatar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { SocialIcon } from "react-social-icons";

export default function InfluencerProfileScreen(props) {
  useEffect(() => {
    axios
      .get(`/influencer/get_public_details`, {
        params: {
          username: props.match.params.influencerUsername
        },
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        console.log(res.data);
        setData(res.data);
      }).catch(err => {
        console.log(err);
      });
  }, []);

  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState({});
  const [username, setUsername] = React.useState(
    props.match.params.influencerUsername
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div
      style={{
        margin: "1px auto 5% auto"
      }}
    >
      <HomeNavBar />
      <div style={{ backgroundColor: "#7e0015", height: "17rem" }}>
        <div>
          <Avatar
            style={{
              display: "block",
              marginRight: "auto",
              marginLeft: "auto",
              paddingTop: "6rem"
            }}
            src={data.profilePicUrl}
            round
          />
        </div>
        <p
          style={{
            textAlign: "center",
            paddingTop: "6.5rem",
            fontSize: "1rem",
            color: "white"
          }}
        >
          {props.match.params.influencerUsername}
        </p>
      </div>

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
      {value === 0 && <ProjectCreationScreen influencerUsername={username} />}
      {value === 2 && (
        <VideoList influencerUsername={username} links={data.videoLink} />
      )}
      {value === 1 && (
        <ReferalLinkList
          influencerUsername={username}
          referrals={data.referralLink}
        />
      )}

      {/* <AppBar
        position="fixed"
        color="red"
        style={{ top: "auto", botton: "0", backgroundColor: "#d3d3d3" }}
      >
        <Toolbar>
          <IconButton>
            <SocialIcon url="http://instagram.com" />
          </IconButton>
        </Toolbar>
      </AppBar> */}
    </div>
  );
}
