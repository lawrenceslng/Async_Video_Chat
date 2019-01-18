import React, { Component } from "react";
import UserDetailsForm from "../UserDetailsForm/UserDetailsForm.js";
import UserContactsForm from "../UserContactsForm/UserContactsForm.js";
import UserCredentialsForm from "../UserCredentialsForm/UserCredentialsForm.js";
import UserGroupForm from "../UserGroupForm/UserGroupForm.js";

import "./SignupForm.css";

export default class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: this.props.step,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      repassword: "",
      groupName: "",
      groupList: []
    };
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState(
      {
        step: step + 1
      },
      () => {
        this.stepIndicator(this.state.step);
      }
    );
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState(
      {
        step: step - 1
      },
      () => {
        this.stepIndicator(this.state.step);
      }
    );
  };

  stepIndicator = step => {
    for (var i = 0; i < document.getElementsByClassName("step").length; i++) {
      document.getElementsByClassName("step")[i].classList.remove("active");
    }
    document.getElementsByClassName("step")[step - 1].classList.add("active");
  };

  handleChange = input => event => {
    this.setState({ [input]: event.target.value });
  };

  submit = () => {
    const {
      firstName,
      lastName,
      email,
      phone,
      username,
      password,
      groupName,
      groupList
    } = this.state;
    const user = {
      firstName,
      lastName,
      email,
      phone,
      username,
      password,
      groupName,
      groupList
    };
    this.props.submitForm(user);
    this.setState(
      {
        step: this.props.step,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        repassword: "",
        groupName: "",
        groupList: []
      },
      () => {
        this.stepIndicator(this.state.step);
      }
    );
  };

  render() {
    const { step } = this.state;

    return (
      <div className="signup-form">
        {(() => {
          switch (step) {
            case 1:
              return (
                <UserDetailsForm
                  nextStep={this.nextStep}
                  handleChange={this.handleChange}
                  firstName={this.state.firstName}
                  lastName={this.state.lastName}
                />
              );
            case 2:
              return (
                <UserContactsForm
                  prevStep={this.prevStep}
                  nextStep={this.nextStep}
                  handleChange={this.handleChange}
                  email={this.state.email}
                  phone={this.state.phone}
                  checkEmail={this.props.checkEmail}
                />
              );
            case 3:
              return (
                <UserCredentialsForm
                  prevStep={this.prevStep}
                  nextStep={this.nextStep}
                  handleChange={this.handleChange}
                  username={this.state.username}
                  password={this.state.password}
                  repassword={this.state.repassword}
                  checkUsername={this.props.checkUsername}
                />
              );
            case 4:
              return (
                <UserGroupForm
                  prevStep={this.prevStep}
                  submit={this.submit}
                  handleChange={this.handleChange}
                  groupName={this.state.groupName}
                  groupList={this.state.groupList}
                  checkGroupName={this.props.checkGroupName}
                />
              );
            default:
              return null;
          }
        })()}
        <div className="form-group" id="form-steps">
          <span className="step active" />
          <span className="step" />
          <span className="step" />
          <span className="step" />
        </div>
      </div>
    );
  }
}
