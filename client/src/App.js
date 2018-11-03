import React, { Component } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Carousel from './components/carousel';
import LoginForm from './components/loginForm';
import PWMatch from './components/accountCreate';
import AdminPanel from './components/adminPanel';

import './App.css';
import './loginForm.css';

class App extends Component {
  // pass in initial states
  constructor(){
    super();
    this.state = {
      loggedIn: true,
      accountCreated: false,
    };
  };

  getToken = () => {
    return localStorage.getItem('token');
  };

  buttonClick = (e) => {
    e.preventDefault();
    // alert("submit");
    console.log(e.target.children[0].className);
    // debugger;
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
      }).then(res => res.json()).then(rj => {
        console.log(rj);
        // debugger
        if(rj.success)
        {
          this.setState({loggedIn: true}, function(){
            localStorage.setItem('token', rj.token);
            localStorage.setItem('id', rj.id);
          });
        }
        else{
          alert("wrong password, try again");
          // this.setState({loggedIn: false});
        }
      })
    }
    else
    {
      // alert("this is a sign up form");
      let username = document.getElementById("username").value;
      let password = document.getElementById("pw").value;
      let firstName = document.getElementById("firstName").value;
      let lastName = document.getElementById("lastName").value;
      let repw = document.getElementById("repw").value;
      let email = document.getElementById("email").value;
      // alert("here");
      if(PWMatch(password, repw))
      {
        //post info to server
        return fetch("http://localhost:3001/signup", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username, firstName, lastName, email, password})
        }).then(res => res.json()).then(rj => {
          console.log(rj);
          // debugger;
          if(rj.success)
          {
            this.setState({loggedIn: true}, function(){
              localStorage.setItem('token', rj.token);
              localStorage.setItem('id', rj.id);
            });
          }
          else{
            this.setState({loggedIn: false});
          }
        })
      }
      else
      {
        //alert passwords do not match, clear out password fields
        alert("Passwords Do Not Match");
        document.getElementById("repw").value = "";
        document.getElementById("pw").value = "";
      }
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
  logOut = (e) => {
    e.preventDefault();
    console.log(e.target.className);
    console.log(localStorage.getItem("token"));
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    console.log(localStorage.getItem("token"));
    // debugger;
    return fetch("http://localhost:3001/logout", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify({username, firstName, lastName, email, password})
    }).then(res => res.json()).then(rj => {
      console.log(rj);
      // debugger;
      if(rj.success)
      {
        this.setState({loggedIn: false});
      }
      else{
        this.setState({loggedIn: true});
      }
    })
  }

  //route to get all users when users search for friends to connect
  // getUsers = (e) => {
  //   e.preventDefault();
  //   console.log(this.state.token);
  //   return fetch("http://localhost:3001/usersapi", {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': this.state.token
  //     }
  //   })
  //   .then(res => res.json())
  //   .then(rj => console.log(rj));
  // };

  componentDidMount() {
    var token = localStorage.getItem("token");
    var id = localStorage.getItem("id");
    console.log(token + ", " + id);
    //hit up check-login-status
    return fetch("http://localhost:3001/check-login",
    {method: 'POST',
    headers: {'Accept': 'application/json',
    'Content-Type': 'application/json'},
    body: JSON.stringify({token})}).then((res) => {
      console.log(res.status);
      if(res.status == '403')
      {
        this.setState({loggedIn: false});
        console.log("logged in false");
        // break;
      }
      else
      {
        this.setState({loggedIn: true});
        console.log("logged in true!");
        // res.json();
      }
      })
    // .then(resultingJSON => {
    //   console.log(resultingJSON);
    //   if(resultingJSON.success){
    //     this.setState({loggedIn: true});
    //   }
    //   else{
    //     this.setState({loggedIn: false});
    //   }});
  };
  render(){

  if(this.state.loggedIn)
    {
      return (
        // code for AdminPanel here
        <div className="App">
          <button onClick={this.logOut}>Logout</button>
          <AdminPanel token={this.getToken}/>
        </div>
      )
    }
    else
    {
      return (
        <div className="App">
          <Header />
          <Carousel />
          <div className="loginBox">
            <button id="sign-up-button"
              onClick={this.changeForm}
              className="btn btn-primary">
              Sign-Up
            </button>
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
