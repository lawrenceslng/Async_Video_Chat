import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { checkLogin, logout } from "./actions/loginAction";

import Header from "./containers/Header/Header.js";
import Login from "./containers/Login/Login.js";
import Footer from "./containers/Footer/Footer.js";
import PWMatch from "./components/accountCreate";
import AdminPanel from "./components/adminPanel";
import SettingsMenu from "./components/SettingsMenu/SettingsMenu";

import "./App.css";

class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log("this is my token if it exists: " + localStorage.getItem("token"));
    if(localStorage.getItem("item") !== null)
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
          <Header />
          <Login />
          <Footer />
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
