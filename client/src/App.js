import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { checkLogin, logout } from "./actions/loginAction";
import Login from "./containers/Login/Login.js";
import AdminPanel from "./containers/AdminPanel/adminPanel";
import SettingsMenu from "./components/SettingsMenu/SettingsMenu";

import "./App.css";

class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    if(localStorage.getItem("token") !== null)
    {
      this.props.checkLogin(localStorage.getItem("token"));
    }
  };

  render() {
    if (this.props.loggedIn) {
      return (
        <div className="App">
          <SettingsMenu />
          <AdminPanel />
        </div>
      );
    } else {
      return (
        <div className="App">
          <Login />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  loggedIn: state.Login.loggedIn,
  token: state.Login.token,
  id: state.Login.id
});

const matchDispatchToProps = dispatch => {
  return bindActionCreators({ checkLogin, logout }, dispatch);
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(App);
