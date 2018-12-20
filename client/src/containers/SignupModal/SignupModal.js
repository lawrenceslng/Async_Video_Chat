import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createUser } from "../../actions/createUserAction.js";

import SignupForm from "../../components/SignupForm/SignupForm.js";

import "./SignupModal.css";

class SignupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1
    };

    this.onClose = this.onClose.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onClose = () => {
    this.setState({ step: 1 });
  };

  submitForm = (user) => {
    this.onClose();
    this.props.createUser(user);
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
              <SignupForm
                step={this.state.step}
                submitForm={this.submitForm}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const matchDispatchToProps = dispatch => {
  return bindActionCreators({ createUser }, dispatch);
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(SignupModal);
