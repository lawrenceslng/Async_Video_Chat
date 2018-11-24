import React, { Component } from "react";
import Discover from "./Discover";
import Friends from "./Friends";
import "./YourCommunity.css";

export default class YourCommunity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discoverTab: false,
      friendsTab: true
    };
  }

  openTab = event => {
    event.preventDefault();

    if (event.target.id === "friends")
      this.setState({ friendsTab: true, discoverTab: false }, () => {
        document.getElementById("friends-content").style.display = "block";
        document.getElementById("discover-content").style.display = "none";
      });
    else
      this.setState({ friendsTab: false, discoverTab: true }, () => {
        document.getElementById("friends-content").style.display = "none";
        document.getElementById("discover-content").style.display = "block";
      });
  };

  render() {
    console.log("PROPS: " + this.props);
    return (
      <div className="your-community">
        <div className="tab-menu">
          <button className="tab-button" id="friends" onClick={this.openTab}>
            Friends
          </button>
          <button className="tab-button" id="discover" onClick={this.openTab}>
            Discover
          </button>
        </div>
        <div className="tab-content">
          <Friends token={this.props.token} />
          <Discover token={this.props.token} />
        </div>
      </div>
    );
  }
}
