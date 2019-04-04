import React from "react";
import axios from "axios";
import Client from "../components/Client";



class ClientList extends React.Component {
  state = {
    clients: []
  };

  fetchArticles = () => {
    axios.get("http://127.0.0.1:8000/influencer/v1/clients/1").then(res => {
      console.log(res);
      this.setState({
        clients: res.data
      });
    });
  }

  componentDidMount() {
    this.fetchArticles();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token) {
      this.fetchArticles();      
    }
  }

  render() {
    return (
      <div>
        <Client data={this.state.clients} /> <br />
      </div>
    );
  }
}

export default ClientList;
