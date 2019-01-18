import React, { Component } from "react";

// import "./UserDetailsForm.css";

export default class UserCredentialsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: 0
    };
  }

  checkCredentials = () => {
    if (this.props.username === "" && this.props.password === "" && this.props.repassword === "") {
      this.setState({ formError: 1 }, () => {
        document.getElementById("signup-username-input").classList.add("error-input");
        document.getElementById("new-password-input").classList.add("error-input");
        document.getElementById("renew-password-input").classList.add("error-input");
      });
    } else if (this.props.username === "") {
      this.setState({ formError: 2 }, () => {
        document.getElementById("signup-username-input").classList.add("error-input");
        document.getElementById("new-password-input").classList.remove("error-input");
        document.getElementById("renew-password-input").classList.remove("error-input");
      });
    } else if (this.props.password === "") {
      this.setState({ formError: 3 }, () => {
        document.getElementById("signup-username-input").classList.remove("error-input");
        document.getElementById("new-password-input").classList.add("error-input");
        document.getElementById("renew-password-input").classList.remove("error-input");
      });
    } else if (this.props.repassword === "") {
      this.setState({ formError: 4 }, () => {
        document.getElementById("signup-username-input").classList.remove("error-input");
        document.getElementById("new-password-input").classList.remove("error-input");
        document.getElementById("renew-password-input").classList.add("error-input");
      });
    } else {
      this.props.checkUsername(this.props.username).then(result => {
        console.log(result);
        if (!result.success) {
          this.setState({ formError: 5 }, () => {
            document.getElementById("signup-username-input").classList.add("error-input");
            document.getElementById("new-password-input").classList.remove("error-input");
            document.getElementById("renew-password-input").classList.remove("error-input");
          });
        }
        else {
          if (!this.passwordMatch(this.props.password, this.props.repassword)) {
            this.setState({ formError: 6 }, () => {
              document.getElementById("signup-username-input").classList.remove("error-input");
              document.getElementById("new-password-input").classList.add("error-input");
              document.getElementById("renew-password-input").classList.add("error-input");
            });
          } else {
            this.setState({ formError: 0 }, () => {
              document.getElementById("signup-username-input").classList.remove("error-input");
              document.getElementById("new-password-input").classList.remove("error-input");
              document.getElementById("renew-password-input").classList.remove("error-input");
              this.props.nextStep();
            });
          }
        }
      });
    }
  };

  passwordMatch = (password, repassword) => {
    return password === repassword && (password !== "" && repassword !== "");
  };

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
              onChange={this.props.handleChange("username")}
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
              onChange={this.props.handleChange("password")}
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
              onChange={this.props.handleChange("repassword")}
              value={this.props.repassword}
            />
          </div>
          <div className="form-group">
            {(() => {
              switch (this.state.formError) {
                case 1:
                  return <small className="error-message">
                    Make sure to input your username and password!
                  </small>;
                case 2:
                  return <small className="error-message">
                    Make sure to input your username!
                  </small>;
                case 3:
                  return <small className="error-message">
                    Make sure to input your password!
                  </small>;
                case 4:
                  return <small className="error-message">
                    Make sure to confirm password!
                  </small>;
                case 5:
                  return <small className="error-message">
                    This username is already being used!
                  </small>;
                case 6:
                  return <small className="error-message">
                    Passwords do not match!
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
