import React, { Component } from "react";
import CreateGroupForm from "../../components/CreateGroupForm/CreateGroupForm.js";
import CreateUserForm from "../../components/CreateUserForm/CreateUserForm.js";

import "./SignupModal.css";

export default class SignupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGroupForm: false
    };
    this.onClose = this.onClose.bind(this);
    this.showNext = this.showNext.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onClose = () => {
    this.setState({ showGroupForm: false });
  };

  showNext = () => {
    this.setState({ showGroupForm: true });
  };

  submitForm = () => {
    // e.preventDefault();
    // let username = document.getElementById("username").value;
    // let password = document.getElementById("pw").value;
    // let firstName = document.getElementById("firstName").value;
    // let lastName = document.getElementById("lastName").value;
    // let repw = document.getElementById("repw").value;
    // let email = document.getElementById("email").value;
    //
    // if (PWMatch(password, repw)) {
    //   return fetch("/signup", {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       username,
    //       firstName,
    //       lastName,
    //       email,
    //       password
    //     })
    //   })
    //     .then(res => res.json())
    //     .then(rj => {
    //       if (rj.success) {
    //         this.setState({ loggedIn: true }, function() {
    //           localStorage.setItem("token", rj.token);
    //           localStorage.setItem("id", rj.id);
    //         });
    //       } else {
    //         this.setState({ loggedIn: false });
    //       }
    //     });
    // } else {
    //   alert("Passwords Do Not Match");
    //   document.getElementById("repw").value = "";
    //   document.getElementById("pw").value = "";
    // }
    this.setState({ showGroupForm: false });
  };



  render() {
    return (
      <div
        className="signup-modal modal fade"
        id="signup-modal"
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Sign up!
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.onClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {!this.state.showGroupForm ? (
                <CreateUserForm showNext={this.showNext} />
              ) : (
                <CreateGroupForm submitForm={this.submitForm} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
