import React, { Component } from "react";

export default class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      results: []
    };
    this.addFriend = this.addFriend.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = () => {
    this.setState(
      {
        searchValue: this.search.value
      },
      () => this.getInfo()
    );
    console.log("24D: " + this.state.searchValue);
  };

  getInfo = () => {
    var token = this.props.token();
    console.log("GET INFO: " + this.state.searchValue);
    if (this.state.searchValue === "") {
      this.setState({ results: [] });
      var textnode = document.createTextNode("");
      document.querySelector(".results-list-box").appendChild(textnode);
    } else {
      console.log("DIS: search value");
      return fetch(`/friends/${this.state.searchValue}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-access-token": token
        }
      })
        .then(res => res.json())
        .then(rj => {
          console.log(rj);
          this.setState({ results: rj });
        });
    }
  };

  addFriend = e => {
    e.preventDefault();

    var user_id = e.target.id;
    var token = this.props.token();

    //do POST fetch call to server
    fetch(`/friends/` + user_id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token })
    })
      .then(res => res.json())
      .then(rj => {
        this.getFriends();
      });
  };
  
  getFriends = () => {
    var token = this.props.token();
    console.log(token);
    return fetch("/friends", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": token
      }
    })
      .then(res => res.json())
      .then(rj => {
        console.log(rj);
        this.setState({ friends: rj });
      });
  };


  render() {
    return (
      <div id="discover-content">
        <input
          id="search-bar"
          type="text"
          placeholder="Search"
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
        />
        <div className="results-list-box">
          <ul className="results-list">
            {this.state.results.length > 0 &&
              this.state.results.map(x => (
                <li className="results-box" id={x.id} name={x.name} key={x.id}>
                  {x.username}
                  <button
                    className="addButton"
                    id={x.id}
                    onClick={this.addFriend}
                  >
                    Add Friend
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
