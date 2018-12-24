import React, { Component } from "react";

// import "./UserDetailsForm.css";

export default class UserCredentialsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  checkCredentials = () => {
    this.props.nextStep();
  }

  render() {
    return (
      <form>
        <div className="col tab">
          Login Credentials:
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="signup-username-input"
              placeholder="Username"
              autoComplete="username"
              onChange={this.props.handleChange('username')}
              value={this.props.username}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="new-password-input"
              aria-describedby="passwordHelp"
              placeholder="Password"
              autoComplete="new-password"
              onChange={this.props.handleChange('password')}
              value={this.props.password}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="renew-password-input"
              aria-describedby="passwordHelp"
              placeholder="Re-enter Password"
              autoComplete="new-password"
              onChange={this.props.handleChange('repassword')}
              value={this.props.repassword}
            />
          </div>
          <div className="form-group">
            <div id="form-buttons">
              <button
                className="button half-buttons"
                type="button"
                id="previous-button"
                onClick={this.props.prevStep}
              >
                Previous
              </button>
              <div className="divider" />
              <button
                className="button half-buttons"
                type="button"
                id="next-button"
                onClick={this.checkCredentials}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
