import React, { Component } from "react";
import Discover from "./Discover";
import Friends from "./Friends";
import "./YourCommunity.css";

export default class YourCommunity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discoverTab: false,
      friendsTab: true,
      friends: [],
    };

    this.openTab = this.openTab.bind(this);
    this.updateFriends = this.updateFriends.bind(this);
  }

  componentDidMount() {
    this.updateFriends();
  }

  openTab = event => {
    event.preventDefault();

    if (event.target.id === "friends")
      this.setState({ friendsTab: true, discoverTab: false }, () => {
        document.getElementById("friends-content").style.display = "block";
        document.getElementById("discover-content").style.display = "none";

        document.getElementById("friends").classList.add("active");
        document.getElementById("discover").classList.remove("active");
      });
    else
      this.setState({ friendsTab: false, discoverTab: true }, () => {
        document.getElementById("friends-content").style.display = "none";
        document.getElementById("discover-content").style.display = "block";

        document.getElementById("discover").classList.add("active");
        document.getElementById("friends").classList.remove("active");
      });
  };

  updateFriends = () => {
    var token = this.props.token();

    return fetch("/friends", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": token
      }
    })
      .then(res => res.json())
      .then(rj => {
        this.setState({ friends: rj }, () => {console.log("UF" + this.state.friends)});
      });
  }

  render() {
    return (
      <div className="your-community">
        <div className="tab-menu">
          <button className="tab-button active" id="friends" onClick={this.openTab}>
            Friends
          </button>
          <button className="tab-button" id="discover" onClick={this.openTab}>
            Discover
          </button>
        </div>
        <div className="tab-content">
          <Friends token={this.props.token} friends={this.state.friends} />
          <Discover token={this.props.token} friends={this.state.friends} updateFriends={this.updateFriends} />
        </div>
      </div>
    );
  }
}
