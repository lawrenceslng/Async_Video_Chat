import React, { Component } from "react";
import "./YourCommunity.css";

export default class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      searchValue: "",
    };
    this.getSearchResults = this.getSearchResults.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.setState({ results: this.props.friends });
    this.getSearchResults(this.state.searchValue)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ results: nextProps.friends });
  }

  handleInputChange = () => {
    this.setState({ searchValue: this.search.value},
      () => this.getSearchResults(this.state.searchValue)
    );
  };

  getSearchResults = (searchValue) => {
    var token = this.props.token();
    if (searchValue === "") {
      return fetch("/friends", {
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
          value={this.state.searchValue}
        />
        <div className="results-list-box">
          <ul className="results-list">
            {this.state.results.map(x => (
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
