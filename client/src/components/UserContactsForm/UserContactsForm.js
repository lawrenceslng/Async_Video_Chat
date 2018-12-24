import React, { Component } from "react";

// import "./UserContactsForm.css";

export default class UserContactsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <form>
        <div className="col tab">
          Contact Info:
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email-input"
              aria-describedby="emailHelp"
              placeholder="Email Address"
              onChange={this.props.handleChange('email')}
              value={this.props.email}
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              className="form-control"
              id="phone-number-input"
              aria-describedby="phoneHelp"
              placeholder="Phone Number"
              onChange={this.props.handleChange('phone')}
              value={this.props.phone}
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
                onClick={this.props.nextStep}
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
