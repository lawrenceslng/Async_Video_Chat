import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { checkLogin } from "./actions/loginAction";

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

    // this.logOut = this.logOut.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }

  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = () => {
    this.props.checkLogin(localStorage.getItem("token"));
  }

  // logOut = e => {
  //   e.preventDefault();
  //
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("id");
  //
  //   return fetch("/logout", {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(rj => {
  //       this.setState({ loggedIn: rj.success ? false : true });
  //     });
  // };

  render() {
    if (this.props.loggedIn) {
      return (
        <div className="App">
          <SettingsMenu logOut={localStorage.getItem("token")} />
          <AdminPanel token={localStorage.getItem("token")} />
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
  loggedIn: state.Login.loggedIn,
});

const matchDispatchToProps = dispatch => {
  return bindActionCreators({ checkLogin }, dispatch);
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
