import React, { Component } from "react";
import Select from "react-select";

import "./UserGroupForm.css";

export default class UserGroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: 0,
      groupList: []
    };
  }

  addEmail = event => {
    if (document.getElementById("add-email-input").value === "" || !this.validateEmail(document.getElementById("add-email-input").value)) {
      this.setState({ formError: 3 }, () => {
        document.getElementById("add-email-input").classList.add("error-input");
      });
    } else {
      this.setState({ formError: 0 }, () => {
        document.getElementById("add-email-input").classList.remove("error-input");
      });

      event.target.value = this.props.groupList.push(
        document.getElementById("add-email-input").value
      );
      document.getElementById("add-email-input").value = "";
      this.props.handleChange("groupList");
      event.target.value = "";
      this.setState({ groupList: this.props.groupList });
    }
  };

  checkGroup = () => {
    if (this.props.groupName === "") {
      this.setState({ formError: 1 }, () => {
        document.getElementById("group-name-input").classList.add("error-input");
      });
    } else {
      this.props.checkGroupName(this.props.groupName).then(result => {
        console.log(result);
        if (!result.success) {
          console.log("WOW")
          this.setState({ formError: 2 }, () => {
            document.getElementById("group-name-input").classList.add("error-input");
          });
        }
        else {
          console.log("MOM")
          this.setState({ formError: 0 }, () => {
            document.getElementById("group-name-input").classList.remove("error-input");
            this.props.submit();
          });
        }
      });
    }
  }

  validateEmail = (email) =>{
    var emailVerifier = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailVerifier.test(email.toLowerCase());
  }

  render() {
    return (
      <form>
        <div className="col tab">
          Create Your Group:
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="group-name-input"
              placeholder="Group Name"
              onChange={this.props.handleChange("groupName")}
              value={this.props.groupName}
            />
          </div>
          <div className="form-group">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="add-email-input"
                placeholder="Add Email"
                aria-label="Add Email"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.addEmail}
                >
                  +
                </button>
              </div>

            </div>
            {this.state.groupList.length === 0 ? (
              <h4 id="group-placeholder">
                Connect with your friends and family!
              </h4>
            ) : (
            <ul className="email-list">
              {this.props.groupList.map(email => (
                <li className="email-item-box" key={email}>
                  {email}
                </li>
              ))}
            </ul>
          )}
          </div>
          <div className="form-group">
            {(() => {
              switch (this.state.formError) {
                case 1:
                  return <small className="error-message">
                    Make sure to input your group name!
                  </small>;
                case 2:
                  return <small className="error-message">
                    This group name is already being used!
                  </small>;
                case 3:
                  return <small className="error-message">
                    Must be a valid email to add!
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
                onClick={this.checkGroup}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
