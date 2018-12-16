import React, { Component } from "react";
import "./SettingsMenu.css";

export default class SettingsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="dropdown">
        <button
          className="btn btn-default dropdown-toggle"
          type="button"
          id="settings-button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <i className="fa fa-gear"></i>
        </button>
        <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="settings-button">
          <li>
            <a href="/" onClick={this.props.logout}>Logout</a>
          </li>
        </ul>
      </div>
    );
  }
}
