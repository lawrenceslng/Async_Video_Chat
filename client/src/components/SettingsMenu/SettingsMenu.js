import React, { Component } from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { logout } from "../../actions/loginAction";
import "./SettingsMenu.css";

class SettingsMenu extends Component {
  constructor(props) {
    super(props);
    // this.state = {};
  }

  onClick = (e) => {
    e.preventDefault();
    this.props.logout();
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
            <a href="/" onClick={this.onClick}>Logout</a>
          </li>
        </ul>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  loggedIn: state.Login.loggedIn,
  token: state.Login.token,
  id: state.Login.id,
});

const matchDispatchToProps = dispatch => {
  return bindActionCreators({ logout }, dispatch);
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(SettingsMenu);
