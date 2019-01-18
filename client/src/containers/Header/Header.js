import React, { Component } from "react";
import logo from "../../images/Thought-Parcel-logo.png";

import "./Header.css";

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Thought Parcel
          </a>
        </nav>
      </div>
    );
  }
}
