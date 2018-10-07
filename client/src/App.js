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
    alert("submit");

  }
  changeForm = (e) => {
    e.preventDefault();
    console.log(e.target.innerHTML);
    if(e.target.innerHTML == "Sign-Up")
    {
      this.setState({accountCreated: false})
    }
    else
    {
      this.setState({accountCreated: true})
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Carousel />
        <div className="loginBox">
          <button onClick={this.changeForm} className="btn btn-primary">Sign-Up</button>
          <button onClick={this.changeForm} className="btn btn-primary">Login</button>
          <LoginForm buttonClick={this.buttonClick} loginForm={this.state.accountCreated}/>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
