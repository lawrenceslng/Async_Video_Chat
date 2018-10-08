import React, { Component } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Carousel from './components/carousel';
import LoginForm from './components/loginForm';
import './App.css';

class App extends Component {
  // pass in initial states
  constructor(){
    super();
    this.state = {
      loggedIn: false,
      accountCreated: false
    }
  }

  buttonClick = (e) => {
    e.preventDefault();
    // alert("submit");
    console.log(e.target.children[0].className);
    if(e.target.children[0].className.includes("login-form"))
    {
      let username = document.getElementById("username").value;
      let password = document.getElementById("pw").value;
      // alert("Login Form Submitted");
      return fetch("http://localhost:3001/login", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      // }).then(res => res.json()).then(rj => {
      //   let pets = [...this.state.pets, rj];
      //   this.setState({loggedIn: true})
      })
    }
    else
    {
      alert("this is a sign up form");
    }
    

  }
  changeForm = (e) => {
    e.preventDefault();
    console.log(e.target.className);
    if(e.target.innerHTML == "Sign-Up")
    {
      document.getElementById("form").reset();
      document.getElementById("sign-up-button").className = "btn btn-primary active";
      document.getElementById("login-button").className = "btn btn-primary";
      this.setState({accountCreated: false})
      // e.target.addClass("active");
    }
    else
    {
      document.getElementById("form").reset();
      document.getElementById("sign-up-button").className = "btn btn-primary";
      document.getElementById("login-button").className = "btn btn-primary active";
      this.setState({accountCreated: true})
      // e.target.addClass("active");
    }
  }

  render() {
    if(this.state.loggedIn)
    {

    }
    else
    {
      return (
        <div className="App">
          <Header />
          <Carousel />
          <div className="loginBox">
            <button id="sign-up-button" onClick={this.changeForm} className="btn btn-primary">Sign-Up</button>
            <button id="login-button" onClick={this.changeForm} className="btn btn-primary">Login</button>
            <LoginForm buttonClick={this.buttonClick} loginForm={this.state.accountCreated} />
          </div>
          <Footer />
        </div>
      );
    }
    
  }
}

export default App;
