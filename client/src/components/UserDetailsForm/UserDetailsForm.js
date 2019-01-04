import React, { Component } from "react";

// import "./UserDetailsForm.css";

export default class UserDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: 0
    };
  }

  checkDetails = () => {
    if (this.props.firstName === "" && this.props.lastName === "") {
      this.setState({ formError: 1 }, () => {
        document.getElementById("first-name-input").classList.add("error-input");
        document.getElementById("last-name-input").classList.add("error-input");
      });
    } else if (this.props.firstName === "") {
      this.setState({ formError: 2 }, () => {
        document.getElementById("first-name-input").classList.add("error-input");
        document.getElementById("last-name-input").classList.remove("error-input");
      });
    } else if (this.props.lastName === "") {
      this.setState({ formError: 3 }, () => {
        document.getElementById("first-name-input").classList.remove("error-input");
        document.getElementById("last-name-input").classList.add("error-input");
      });
    } else {
      this.setState({ formError: 0 }, () => {
        document.getElementById("first-name-input").classList.remove("error-input");
        document.getElementById("last-name-input").classList.remove("error-input");
        this.props.nextStep();
      });
    }
  };

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
              onChange={this.props.handleChange("firstName")}
              value={this.props.firstName}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="last-name-input"
              placeholder="Last Name"
              onChange={this.props.handleChange("lastName")}
              value={this.props.lastName}
            />
          </div>
          <div className="form-group">
            {(() => {
              switch (this.state.formError) {
                case 1:
                  return <small className="error-message">
                    Make sure to input your first name and last name!
                  </small>;
                case 2:
                  return <small className="error-message">
                    Make sure to input your first name!
                  </small>;
                case 3:
                  return <small className="error-message">
                    Make sure to input your last name!
                  </small>;
                default:
                  break;
              }
            })()}
          </div>
          <div className="form-group">
            <button
              className="button"
              type="button"
              id="next-button"
              onClick={this.checkDetails}
            >
              Next
            </button>
          </div>
        </div>
      </form>
    );
  }
}
