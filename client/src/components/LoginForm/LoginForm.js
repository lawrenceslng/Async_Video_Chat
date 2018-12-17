import React, { Component } from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { login } from "../../actions/loginAction";
import "./LoginForm.css";

class LoginForm extends Component {
  constructor() {
    super();
  };

  onClick = (event) => {
    event.preventDefault();
    this.props.login(this.usernameInput.value, this.passwordInput.value);
  };

  render() {
    return (
      <div className="login-form">
        <form>
          <div className="form-group col">
            <input
              type="text"
              className="form-control"
              id="username-input"
              ref={node => (this.usernameInput = node)}
              aria-describedby="usernameHelp"
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group col">
            <input
              type="password"
              className="form-control"
              id="password-input"
              ref={node => (this.passwordInput = node)}
              aria-describedby="passwordHelp"
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group col">
            <div className="row">
              <div className="col-auto mr-auto">
                <input type="checkbox" aria-label="Checkbox for Remember Me" />
                <label id="remember-label">Remember Me</label>
              </div>
              <div className="col-auto">
                <a id="forgot-password-link" href="/">
                  Forgot Password?
                </a>
              </div>
            </div>
          </div>
          <div className="form-group col">
            <button
              type="submit"
              className="button"
              id="login-button"
              onClick={this.onClick}
            >
              Login
            </button>
          </div>
        </form>
      
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
  return bindActionCreators({ login }, dispatch);
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(LoginForm);