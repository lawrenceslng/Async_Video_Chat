import React, { Component } from "react";

// import "./UserDetailsForm.css";

export default class UserDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <form>
        <div className="col tab">
          Name:
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="first-name-input"
              placeholder="First Name"
              onChange={this.props.handleChange('firstName')}
              value={this.props.firstName}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="last-name-input"
              placeholder="Last Name"
              onChange={this.props.handleChange('lastName')}
              value={this.props.lastName}
            />
          </div>
          <div className="form-group">
            <button
              className="button"
              type="button"
              id="next-button"
              onClick={this.props.nextStep}
            >
              Next
            </button>
          </div>
        </div>
      </form>
    );
  }
}
