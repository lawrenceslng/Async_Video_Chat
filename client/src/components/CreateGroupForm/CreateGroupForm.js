import React, { Component } from "react";
import Select from "react-select";

import "./CreateGroupForm.css";

export default class CreateGroupForm extends Component {
  onClick = () => {
    this.props.submitForm();
  };

  render() {
    return (
      <div className="create-group-form">
        <div className="col">
          <label>Create your group.</label>
        </div>
        <form>
          <div className="form-group col">
            <input
              type="text"
              className="form-control"
              id="first-name-input"
              placeholder="Group Name"
            />
          </div>
          <div className="form-group col">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Add Email"
                aria-label="Add Email"
              />
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button">
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="form-group col">
            <button
              className="button"
              id="next-button"
              data-dismiss="modal"
              aria-label="Close"
              onClick={this.onClick}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
