import React, { Component } from "react";
import Select from "react-select";
import VideoPlayer from "./VideoPlayer.js";
import "./CreateThought.css";

export default class CreateThought extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionInput: "",
      friends: [{ id: 0, username: "l" }],
      selectedOption: [],
      titleInput: ""
    };

    this.getFriends = this.getFriends.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.getFriends();
  }

  getFriends = () => {
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
        for (var i = 0; i < rj.length; i++) {
          rj[i].value = rj[i].id;
          rj[i].label = rj[i].username;
        }
        this.setState({ friends: rj });
      });
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  onChange = (event) => {
    console.log(event.target.id)

    if(event.target.id === "title-input") {
      this.setState({titleInput: event.target.value});
    }
    if(event.target.id === "description-input") {
      this.setState({descriptionInput: event.target.value});
    }
  }

  render() {
    return (
      <div className="create-thought">
        <h1>Share your thoughts.</h1>
        <div id="side-container">
          <div id="left-container">
            <input
              id="title-input"
              placeholder="Add Title For Thought"
              value={this.state.titleInput}
              onChange={this.onChange}
            />
            <br />
            <textarea
              id="description-input"
              type="text"
              placeholder="Add Description For Thought"
              value={this.state.descriptionInput}
              onChange={this.onChange}
            />
            {this.state.friends.length > 0 && (
              <Select
                id="select-input"
                isMulti
                options={this.state.friends}
                value={this.state.selectedOption}
                onChange={this.handleChange}
                placeholder="Select friends to share the video."
              />
            )}
          </div>
          <div id="right-container">
            <VideoPlayer
              descriptionInput={this.state.descriptionInput}
              selectedOption={this.state.selectedOption}
              titleInput={this.state.titleInput}
              token={this.props.token}
            />
          </div>
        </div>
      </div>
    );
  }
}
