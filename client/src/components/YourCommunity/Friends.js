import React, { Component } from "react";

export default class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      friends: [{
          id: 0,
          name: ""
        }
      ],
      results: [],
    };
    this.getFriends = this.getFriends.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    var token = this.props.token();
    return fetch("http://localhost:3001/friends", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": token,
      }
    })
      .then(res => res.json())
      .then(rj => {
        console.log(rj);
        this.setState({ friends: rj });
        this.getInfo();
      });
  }

  handleInputChange = () => {
    this.setState(
      {
        searchValue: this.search.value
      },
      () => this.getInfo()
    );
    console.log("24F: " + this.state.searchValue);
  };

  getInfo = () => {
    var token = this.props.token();

    if (this.state.searchValue === "") {
      this.setState({ results: [] });
      var textnode = document.createTextNode("");
      document.querySelector(".results-list-box").appendChild(textnode);
    } else {
      return fetch(`http://localhost:3001/friends/${this.state.searchValue}`, {
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

  getFriends = () => {
    var token = this.props.token();
    console.log(token);
    return fetch("http://localhost:3001/friends", {
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
      <div id="friends-content">
        <input
          id="search-bar"
          type="text"
          name="username"
          placeholder="Search"
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
        />
        <div className="results-list-box">
          <ul className="results-list">
            {this.state.friends.map(x => (
              <li className="results-box" id={x.id} key={x.id}>
                {x.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
// {this.state.results.length > 0 && this.state.results.map((x) => <div id={x.id} name={x.name} key={x.id}>{x.username}</div>)}
