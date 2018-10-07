import React from "react";

const LoginForm = (props) => (
    <form onSubmit={props.buttonClick}>
            <div className="form-group row">
    <div className="col-7">
        <label for="username"><b>Username</b></label>
        <input id="username" type="text" placeholder="Enter Username" name="username" required />
        <br />
        <label for="first_name"><b>First Name</b></label>
        <input id="firstName" type="text" placeholder="Enter your first name" name="first_name" required />
        <br />
        <label for="last_name"><b>Last Name</b></label>
        <input id="lastName" type="text" placeholder="Enter your last name" name="last_name" required />
        <br />
        <label for="email"><b>Email</b></label>
        <input id="email" type="email" placeholder="Enter Email" name="email" required />
        <br />
        <label for="password"><b>Password</b></label>
        <input id="pw" className="pw" type="password" placeholder="Enter Password" name="password" required />
        <br />
        <label for="password_reenter"><b>Re-Enter Password</b></label>
        <input id="repw"  className="repw" type="password" placeholder="Enter Password" name="password_reenter" required />
        <hr />
        <span className="font-weight-light">Password must be between 8 - 16 characters in length</span>
        <br /><br />
        <button id="createAccount" type="submit" className="btn btn-primary">Create Account!</button>
    </div>
    </div>
    </form>
)

export default LoginForm;