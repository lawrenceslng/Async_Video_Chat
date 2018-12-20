import React, { Component } from "react";
import Select from "react-select";

import "./UserGroupForm.css";

export default class UserGroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupList: []
    };
  }

  addEmail = event => {
    console.log(this.props.groupList)
    event.target.value = this.props.groupList.push(
      document.getElementById("add-email-input").value
    );
    document.getElementById("add-email-input").value = "";
    this.props.handleChange("groupList");
    event.target.value = "";
    this.setState({ groupList: this.props.groupList });
  };

  render() {
    return (
      <form>
        <div className="col tab">
          Create Your Group:
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="first-name-input"
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
                data-dismiss="modal"
                onClick={this.props.submit}
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

// <Select
//   id="add-email-input"
//   className="form-control"
//   isMulti
//   value={this.props.groupList}
//   onChange={this.handleChange}
//   placeholder="Add Email"
// />

// <input
//   type="text"
//   className="form-control"
//   placeholder="Add Email"
//   aria-label="Add Email"
// />
// <div className="input-group-append">
//   <button className="btn btn-outline-secondary" type="button">
//     +
//   </button>
// </div>
