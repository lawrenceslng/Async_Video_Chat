import React, { Component } from "react";
import "./YourCommunity.css";

export default class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // friends: [],
      results: [],
      searchValue: ""
    };
    this.addFriend = this.addFriend.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = () => {
    this.setState({ searchValue: this.search.value},
      () => this.getSearchResults(this.state.searchValue)
    );
  };

  getSearchResults = (searchValue) => {
    var token = this.props.token();
    if (searchValue === "") {
      this.setState({ results: [] });
      var textnode = document.createTextNode("");
      document.querySelector(".results-list-box").appendChild(textnode);
    } else {
      return fetch(`/friends/${searchValue}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-access-token": token
        }
      })
        .then(res => res.json())
        .then(rj => {
          this.setState({ results: rj });
        });
    }
  };

  addFriend = e => {
    e.preventDefault();

    var user_id = e.target.id;
    var token = this.props.token();

    alert("Added friend!");
    this.setState({ searchValue: ""});
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
        this.setState({ searchValue: ""});
        this.props.updateFriends();
      });
  };

  isFriend = user_id => {
    return this.props.friends.some(friend => friend.id === user_id);
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
          value={this.state.searchValue}
        />
        <div className="results-list-box">
          {this.state.searchValue === "" ? (
            <h4 id="search-placeholder">
              Connect with your friends and family!
            </h4>
          ) : (
            <ul className="results-list">
              {this.state.results.length > 0 &&
                this.state.results.map(x => (
                  <li
                    className="results-box"
                    id={x.id}
                    name={x.name}
                    key={x.id}
                  >
                    {x.username}
                    {!this.isFriend(x.id) ? (
                      <button
                        className="add-button"
                        id={x.id}
                        onClick={this.addFriend}
                      >
                        Add Friend
                      </button>
                    ) : (
                      ""
                    )}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}
