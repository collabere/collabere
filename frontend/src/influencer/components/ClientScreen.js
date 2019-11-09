import React from "react";
import axios from "axios";
import { List } from "antd";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { message, Spin } from "antd";

import InfiniteScroll from "react-infinite-scroller";

import { local, dev } from "../../config/envConfig";
import ProjectCard from "./ProjectDetailCard";
import InboxNavbar from "./Navbar";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class ClientScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      loading: false,
      hasMore: true,
      updatModalOpen: false,
      colour: "#FFFFFF",
      currentListItem: "",
      sortOptionValue: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSortAplphabetically = this.handleSortAplphabetically.bind(this);
    this.handleSortByStartingDates = this.handleSortByStartingDates.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.url = process.env.NODE_ENV === undefined ? local.url : dev.url;
  }

  fetchArticles = () => {
    const {
      match: { params }
    } = this.props;

    axios
      .get(
        `/project/byInfluencerUserName/${params.influencerUsername}`,
        { headers: { Authorization: sessionStorage.getItem("token") } }
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
    console.log(sessionStorage.getItem("token"));
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

  handleLogout() {
    sessionStorage.removeItem("token");
  }

  handleChangeOfSortOption = event => {
    this.setState({ sortOptionValue: event.target.value }, function() {
      if (this.state.sortOptionValue === "alphabetical") {
        this.handleSortAplphabetically();
      } else {
        this.handleSortByStartingDates();
      }
    });
  };

  render() {
    return (
      <div>
        <InboxNavbar
          influencerUsername={this.props.match.params.influencerUsername}
        />
        <div style={{ maxWidth: "80%", margin: "auto" }}>
          <ExpansionPanel style={{ paddingTop: ".7rem" }}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography style={{ color: "#7e0015", textAlign: 'center' }}>SORT OPTIONS:</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <RadioGroup
                value={this.state.sortOptionValue}
                onChange={this.handleChangeOfSortOption}
              >
                <FormControlLabel
                  value="alphabetical"
                  control={<Radio color="primary" />}
                  label="Sort Alphabetically"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="date"
                  control={<Radio color="primary" />}
                  label="Sort By Starting Dates"
                  labelPlacement="end"
                />
              </RadioGroup>
            </ExpansionPanelDetails>
          </ExpansionPanel>
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
                  
                >
                  <List.Item key={item.id}>
                    <ProjectCard
                      clientName={item.clientName}
                      introText={item.introText}
                      dateStarted={item.projectInitiationDate}
                      minBudget={item.minBudget}
                      maxBudget={item.maxBudget}
                      clientId={item.clientId}
                      influencerUserName={
                        this.props.match.params.influencerUsername
                      }
                    />
                  </List.Item>
                  {/* </a>
                  </Link> */}
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
