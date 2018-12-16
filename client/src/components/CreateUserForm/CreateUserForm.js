import React, { Component } from "react";

import "./CreateUserForm.css";

export default class CreateUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClick = this.onClick.bind(this);
  }

  onClick = () => {
    this.props.showNext();
  };

  render() {
    return (
      <div className="create-user-form">
        <div className="col">
          <label>Create your account.</label>
        </div>
        <form>
          <div className="form-group col">
            <input
              type="text"
              className="form-control"
              id="first-name-input"
              placeholder="First Name"
            />
          </div>
          <div className="form-group col">
            <input
              type="text"
              className="form-control"
              id="last-name-input"
              placeholder="Last Name"
            />
          </div>
          <div className="form-group col">
            <input
              type="text"
              className="form-control"
              id="signup-username-input"
              placeholder="Username"
            />
          </div>
          <div className="form-group col">
            <input
              type="email"
              className="form-control"
              id="email-input"
              aria-describedby="emailHelp"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group col">
            <input
              type="password"
              className="form-control"
              id="signup-password-input"
              aria-describedby="passwordHelp"
              placeholder="Password"
            />
          </div>
          <div className="form-group col">
            <input
              type="password"
              className="form-control"
              id="signup-repassword-input"
              aria-describedby="passwordHelp"
              placeholder="Re-enter Password"
            />
          </div>
        </form>
        <div className="form-group col">
          <button className="button" id="next-button" onClick={this.onClick}>
            Next
          </button>
        </div>
      </div>
    );
  }
}
