import React, { Component } from "react";
import Cleave from 'cleave.js/react';
import CleavePhone from 'cleave.js/dist/addons/cleave-phone.us';

// import "./UserContactsForm.css";

export default class UserContactsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: 0
    };
  }

  checkContacts = () => {
    if (this.props.email === "" && this.props.phone === "") {
      this.setState({ formError: 1 }, () => {
        document.getElementById("email-input").classList.add("error-input");
        document.getElementById("phone-number-input").classList.add("error-input");
      });
    } else if (this.props.email === "") {
      this.setState({ formError: 2 }, () => {
        document.getElementById("email-input").classList.add("error-input");
        document.getElementById("phone-number-input").classList.remove("error-input");
      });
    } else if (this.props.phone === "") {
      this.setState({ formError: 3 }, () => {
        document.getElementById("email-input").classList.remove("error-input");
        document.getElementById("phone-number-input").classList.add("error-input");
      });
    } else if (!this.validateEmail(this.props.email)) {
      this.setState({ formError: 4 }, () => {
        document.getElementById("email-input").classList.add("error-input");
        document.getElementById("phone-number-input").classList.remove("error-input");
      });
    } else if (!this.validatePhone(this.props.phone.replace(/ /g, ""))) {
      this.setState({ formError: 5 }, () => {
        document.getElementById("email-input").classList.remove("error-input");
        document.getElementById("phone-number-input").classList.add("error-input");
      });
    } else {
      this.props.checkEmail(this.props.email).then(result => {
        console.log(result);
        if (!result.success) {
          this.setState({ formError: 6 }, () => {
            document.getElementById("email-input").classList.add("error-input");
            document.getElementById("phone-number-input").classList.remove("error-input");
          });
        }
        else {
          this.setState({ formError: 0 }, () => {
            document.getElementById("email-input").classList.remove("error-input");
            document.getElementById("phone-number-input").classList.remove("error-input");
            this.props.nextStep();
          });
        }
      });
    }
  }

  validateEmail = (email) =>{
    var emailVerifier = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailVerifier.test(email.toLowerCase());
  }

  validatePhone = (phone) => {
    return (phone.startsWith("1") ? phone.length === 11 : phone.length === 10);
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
              onChange={this.props.handleChange("email")}
              value={this.props.email}
            />
          </div>
          <div className="form-group">
            <Cleave
              className="form-control"
              id="phone-number-input"
              placeholder="Phone Number"
              options={{phone: true, phoneRegionCode: 'us'}}
              onChange={this.props.handleChange("phone")}
              value={this.props.phone} />
          </div>
          <div className="form-group">
            {(() => {
              switch (this.state.formError) {
                case 1:
                  return <small className="error-message">
                    Make sure to input your email and phone number!
                  </small>;
                case 2:
                  return <small className="error-message">
                    Make sure to input your email!
                  </small>;
                case 3:
                  return <small className="error-message">
                    Make sure to input your phone number!
                  </small>;
                case 4:
                  return <small className="error-message">
                    Make sure your email address is correct!
                  </small>;
                case 5:
                  return <small className="error-message">
                    Make sure your phone number is correct!
                  </small>;
                case 6:
                  return <small className="error-message">
                    This email is already being used!
                  </small>;
                default:
                  break;
              }
            })()}
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
                onClick={this.checkContacts}
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
