import React from "react";
import axios from "axios";
import { List } from "antd";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { message, Spin } from "antd";
import { Modal } from "antd";

import InfiniteScroll from "react-infinite-scroller";

import { local, dev } from "../../config/envConfig";
import ProjectCard from "./ProjectDetailCard";
import InboxNavbar from "./Navbar";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LoginModal from "../../login/loginModal";
toast.configure();

function getPossitiveFields(map) {
  let count = 0;

  Object.keys(map).forEach(function(key) {
    if (map[key] === true) {
      count = count + 1;
    }
  });
  return count;
}
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
      sortOptionValue: "",
      checkBoxStateMap: null,
      deletePromptOpen: false,
      loginAgainModalFlag: false,
      loginModalOpen: false,
      totalUnreadMessages: 0,
      projectMsgArr: [] = []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSortAplphabeticallyAscending = this.handleSortAplphabeticallyAscending.bind(
      this
    );
    this.handleSortAplphabeticallyDescending = this.handleSortAplphabeticallyDescending.bind(
      this
    );
    this.handleSortByStartingDates = this.handleSortByStartingDates.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.url = process.env.NODE_ENV === undefined ? local.url : dev.url;
  }

  fetchArticles = () => {
    const {
      match: { params }
    } = this.props;

    // const search = new URLSearchParams(this.props.location.search);
    // console.log("*******************", qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).code);
    let token = localStorage.getItem("token");

    axios
      .get(`/project/byInfluencerUserName/${params.influencerUsername}`, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` } //localStorage.getItem("token") }
      })
      .then(res => {
        console.log(res);
        this.setState(
          {
            clients: res.data
          },
          function() {
            let checkBoxMap = {};
            this.state.clients.forEach(element => {
              checkBoxMap[element.projectInitiationDate] = false;
            });
            this.setState({ checkBoxStateMap: checkBoxMap });
            console.log(checkBoxMap);
          }
        );
      })
      .catch(err => {
        console.log("Error occurred...", err);
      });
  };

  fetchUnreadMessages = () => {
    console.log('Calling Fetch Unread Messages.');
    axios.get(`/messages/get_unread_messages_by_projects?username=${localStorage.getItem("username")}`, {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` }
    }).then((res) => {
      let total = 0;
      res.data.map(val => {
        total += val.total;
      });
      this.setState({projectMsgArr: res.data, totalUnreadMessages: total});
      console.log('UnRead messages',res.data);
    })
  }

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
    const {
      match: { params }
    } = this.props;
    localStorage.setItem("username", params.influencerUsername); //might cause problemsif some random link is opened
    this.fetchArticles();
    let url = `/influencer/fetch_access_token?username=${params.influencerUsername}`;
    axios
      .get(url)
      .then(response => {
        if (response.data.instagramUserId) {
          localStorage.setItem("token", response.data.accessToken);
        } else {
          if (
            localStorage.getItem("token") &&
            localStorage.getItem("token") !== response.data.accessoken
          ) {
            this.setState({ loginAgainModalFlag: true });
          }
        }
        this.fetchArticles();
        this.fetchUnreadMessages();
      })
      .catch(err => {
        console.log(err);
      });
  }

  modifyCheckBoxStateMap = (dateStarted, checked) => {
    let initailMap = this.state.checkBoxStateMap;
    initailMap[dateStarted] = checked;
    this.setState(prevState => ({
      checkBoxStateMap: initailMap
    }));
  };

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

  handleChange(value) {
    let currentList = [];
    let newList = [];
    if (value !== "") {
      currentList = this.state.clients;
      newList = currentList.filter(client => {
        const clientNameLoweCase = client.clientName.toLowerCase();
        const filter = value.toLowerCase();
        return clientNameLoweCase.includes(filter);
      });
    } else {
      this.fetchArticles();
    }
    this.setState({
      clients: newList
    });
  }

  handleSortAplphabeticallyAscending() {
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

  removeProjectFromProjectList = dateStarted => {
    this.setState(prevState => ({
      clients: prevState.clients.filter(function(object) {
        return object.projectInitiationDate !== dateStarted;
      })
    }));
  };

  handleSortAplphabeticallyDescending() {
    let sortedList = this.state.clients;
    sortedList.sort(function(a, b) {
      var textA = a.clientName.toUpperCase();
      var textB = b.clientName.toUpperCase();
      return textA > textB ? -1 : textA < textB ? 1 : 0;
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

  removeDeletedDatesfromCheckboxStateMap = dateArray => {
    let initailMap = Object.assign({}, this.state.checkBoxStateMap);

    dateArray.forEach(dateStarted => {
      delete initailMap[dateStarted];
    });

    this.setState(prevState => ({
      checkBoxStateMap: initailMap
    }));
  };

  handleBulkDelete = () => {
    let promiseArray = [];
    let dateStartedArray = [];

    const { checkBoxStateMap } = this.state;
    let token = localStorage.getItem("token");
    Object.keys(checkBoxStateMap).forEach(function(key) {
      if (checkBoxStateMap[key] === true) {
        let config = {
          params: {
            project_initiation_date: key
          },
          headers: {
            Authorization: `Token ${token}`
          }
        };
        promiseArray.push(axios.get("/project/delete_project", config));
        dateStartedArray.push(key);
      }
    });
    Promise.all(promiseArray)
      .then(() => {
        this.setState(
          prevState => ({
            clients: prevState.clients.filter(function(object) {
              return !dateStartedArray.includes(object.projectInitiationDate);
            })
          }),
          function() {
            this.setState({ deletePromptOpen: false });
            this.removeDeletedDatesfromCheckboxStateMap(dateStartedArray);
          }
        );

        toast.success("Projects removed successfully!", {
          position: toast.POSITION.TOP_RIGHT
        });
      })
      .catch(() => {
        toast.error("Operation failed, try again later", {
          position: toast.POSITION.TOP_RIGHT
        });
      });
  };

  onHover = date => {
    this.setState({ currentListItem: date });
  };

  onHoverOut = () => {
    this.setState({ currentListItem: "#ffffff" });
  };

  handleLogout() {
    console.log("logout called.");
    localStorage.clear();
  }

  handleChangeOfSortOption = event => {
    this.setState({ sortOptionValue: event.target.value }, function() {
      if (this.state.sortOptionValue === "alphabetical_ascending") {
        this.handleSortAplphabeticallyAscending();
      } else if (this.state.sortOptionValue === "date") {
        this.handleSortByStartingDates();
      } else if (this.state.sortOptionValue === "alphabetical_descnding") {
        this.handleSortAplphabeticallyDescending();
      } else {
        this.fetchArticles();
      }
    });
  };

  render() {
    const { checkBoxStateMap, deletePromptOpen, clients } = this.state;
    return (
      <div>
        <InboxNavbar
          influencerUsername={this.props.match.params.influencerUsername}
          handleSearch={this.handleChange}
          showSearchBar={true}
          unreadMsg={this.state.totalUnreadMessages}
        />
        <div style={{ maxWidth: "80%", margin: "auto" }}>
          <ExpansionPanel style={{ paddingTop: "4rem" }}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography style={{ color: "#7e0015", textAlign: "center" }}>
                SORT OPTIONS
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <RadioGroup
                value={this.state.sortOptionValue}
                onChange={this.handleChangeOfSortOption}
              >
                <FormControlLabel
                  value="alphabetical_ascending"
                  control={<Radio color="primary" />}
                  label="Sort Alphabetically(A-Z)"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="alphabetical_descnding"
                  control={<Radio color="primary" />}
                  label="Sort Alphabetically(Z-A)"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="date"
                  control={<Radio color="primary" />}
                  label="Sort By Starting Dates"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="reset"
                  control={<Radio color="primary" />}
                  label="Reset"
                  labelPlacement="end"
                />
              </RadioGroup>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <hr />

          {clients.length > 0 &&
          checkBoxStateMap &&
          getPossitiveFields(checkBoxStateMap) >= 1 ? (
            <Button
              size="small"
              color="secondary"
              onClick={() => this.setState({ deletePromptOpen: true })}
            >
              Delete All Projects
            </Button>
          ) : null}

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
                      latestText={item.latestText}
                      clientRating={item.clientRating}
                      influencerUsername={
                        this.props.match.params.influencerUsername
                      }
                      removeProjectFromList={this.removeProjectFromProjectList}
                      markProject={this.modifyCheckBoxStateMap}
                      isCompleted={item.isCompleted}
                      // unreadMsgCount={this.state.projectMsgArr.filter(val => val.projectInitiationDate === item.projectInitiationDate)}
                    />
                  </List.Item>
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

        <Dialog
          open={deletePromptOpen}
          onClose={() => this.setState({ deletePromptOpen: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Projects"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you realy want to delete the selected projects? This will
              delete the underlying messages as well!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.setState({ deletePromptOpen: false })}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              size="small"
              color="secondary"
              onClick={this.handleBulkDelete}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.loginAgainModalFlag}>
          <DialogTitle id="alert-dialog-title">
            You have been logged out! Please login again
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({
                  loginModalOpen: true,
                  loginAgainModalFlag: false
                });
              }}
              color="primary"
            >
              LOGIN
            </Button>
          </DialogActions>
        </Dialog>
        <Modal
          title="Login"
          visible={false}
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <LoginModal />
        </Modal>
      </div>
    );
  }
}

export default ClientScreen;
