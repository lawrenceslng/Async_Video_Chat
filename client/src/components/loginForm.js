import React from "react";

const LoginForm = (props) => {
    if(props.loginForm == false)
    {
    return (
    <form id="form"  onSubmit={props.buttonClick}>
        <div className="form-group row registration-form createAccount" >
            <div className="col-3">
                <label htmlFor="username"><b></b></label>
                <input id="username" type="text" placeholder="Create Username" name="username"  required />
                <br />
                <label htmlFor="first_name"><b></b></label>
                <input id="firstName" type="text" placeholder="Enter First Name" name="first_name"  required />
                <br />
                <label htmlFor="last_name"><b></b></label>
                <input id="lastName" type="text" placeholder="Enter Last Name" name="last_name"  required />
                <br />
                <label htmlFor="email"><b></b></label>
                <input id="email" type="email" placeholder="Enter Email Address" name="email" required />
                <br />
                <label htmlFor="password"><b></b></label>
                <input id="pw" className="pw" type="password" minlength="8" maxlength="16" placeholder="Create Password" name="password" value= {props.val} required />
                <br />
                <label htmlFor="password_reenter"><b></b></label>
                <input id="repw"  className="repw" type="password" minlength="8" maxlength="16" placeholder="Re-enter Password" name="password_reenter" required />
                <br />
                <button id="createAccount" type="submit" className="btn btn-primary">Create Account!</button>
                <br /><br />
            </div>
        </div>
      <div className="shadow"></div>
    </form>
    )
    }
    else
    {
        return(
        <form id="form" onSubmit={props.buttonClick}>
            <div  className="form-group row login-form login">
                <div className="col-7">
                <label htmlFor="username"><b></b></label>
                <input id="username" type="text" placeholder="Username" name="username" required />
                <br />
                <label htmlFor="password"><b></b></label>
                <input id="pw" className="pw" type="password" placeholder="Password" name="password" required />
                <br />
                <button id="login" type="submit" className="btn btn-primary">Login</button>
                </div>
            </div>
            <div className="shadow"></div>
        </form>
        )

    }
}


export default LoginForm;