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
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }

  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = () => {
    if (localStorage.getItem("state") === null) {
      this.props.checkLogin("");
    } else this.props.checkLogin(this.props.token, this.props.id);
  };

  logout = event => {
    event.preventDefault();

    localStorage.removeItem("state");
    this.props.logout();
  };

  render() {
    if (this.props.token !== "") {
      return (
        <div className="App">
          <SettingsMenu logout={this.logout} />
          <AdminPanel token={this.props.token} />
        </div>
      );
    } else {
      return (
        <div className="App">
          <Header />
          <Login checkLogin={this.checkLogin} />
          <Footer />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
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

// <Header />
// <Carousel />
// <div className="loginBox">
//   <button id="sign-up-button"
//     onClick={this.changeForm}
//     className="btn btn-primary">
//     Sign-Up
//   </button>
//   <button id="login-button" onClick={this.changeForm} className="btn btn-primary">Login</button>
//   <LoginForm buttonClick={this.buttonClick} loginForm={this.state.accountCreated} />
// </div>
// <Footer />
