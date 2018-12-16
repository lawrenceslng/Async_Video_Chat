import React, { Component } from "react";

import "./LoginForm.css";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick = (event) => {
    event.preventDefault();
    this.props.onClick(this.usernameInput.value, this.passwordInput.value);
  //   event.preventDefault();
  //   console.log(this.usernameInput.value)
  //   console.log(this.passwordInput.value)
  //
  //   let username = this.usernameInput.value;
  //   let password = this.passwordInput.value;
  //
  //   if(username !== "" && password !== "") {
  //     this.props.login({ username, password });
  //     if(this.props.loggedIn)
  //       console.log("HERE")
  // return fetch("/login", {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify({ username, password })
  // })
  //   .then(res => res.json())
  //   .then(rj => {
  //     console.log(rj);
  //     if (rj.success) {
  //       this.setState({ loggedIn: true }, function() {
  //         localStorage.setItem("token", rj.token);
  //         localStorage.setItem("id", rj.id);
  //       });
  //     } else {
  //       alert("wrong password, try again");
  //     }
  //   });
  //   }
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
}
