import React from "react";

const loginForm = () => (
    <form>
    <div class="form-group row">
        <div class="col-7">
            <label for="username"><b>Username</b></label>
            <input id="username" type="text" placeholder="Enter Username" name="username" required>
            <br>
            <label for="first_name"><b>First Name</b></label>
            <input id="firstName" type="text" placeholder="Enter your first name" name="first_name" required>
            <br>
            <label for="last_name"><b>Last Name</b></label>
            <input id="lastName" type="text" placeholder="Enter your last name" name="last_name" required>
            <br>
            <label for="email"><b>Email</b></label>
            <input id="email" type="email" placeholder="Enter Email" name="email" required>
            <br>
            <label for="password"><b>Password</b></label>
            <input id="pw" class="pw" type="password" placeholder="Enter Password" name="password" required>
            <br>
            <label for="password_reenter"><b>Re-Enter Password</b></label>
            <input id="repw"  class="repw" type="password" placeholder="Enter Password" name="password_reenter"         required>
            <label class="d-none" for="profileAvatar"><b>profileAvatar</b></label>
            <input id="av" class="av d-none" type="text" placeholder="profileAvatarPath" name="profileAvatar"       style="width: 250px;"></span> 
            <hr>
            <span class="font-weight-light">Password must be between 8 - 16 characters in length</span>
            <br><br>
            <button id="createAccount" type="submit" class="btn btn-primary">Create Account!</button>
        </div>
        </form>
);
export default LoginForm;