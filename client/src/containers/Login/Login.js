import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from "../../actions/loginAction";

import LoginForm from "../../components/LoginForm/LoginForm.js";
import SignupModal from "../SignupModal/SignupModal.js";
import logo from "../../images/ParcelMascot.png";

import "./Login.css";

export default class Login extends Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <div>
        {/* Add Modal at TOP level */}
        <SignupModal />
        <div className="login container">
          <div id="logo-box">
            <img id="logo" src={logo} alt="logo" width="250" height="250" />
          </div>
          <div id="login-box">
            <LoginForm />
            <div className="clearfix">
              <label>Don't have an account?</label>
              <button
                className="button"
                id="signup-button"
                type="button"
                data-toggle="modal"
                data-target="#signup-modal"
                data-backdrop="static"
                data-keyboard="false"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}