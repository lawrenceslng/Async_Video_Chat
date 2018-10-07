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

  render() {
    return (
      <div className="App">
        <Header />
        <Carousel />
        <LoginForm buttonClick={this.buttonClick}/>
        <Footer />
      </div>
    );
  }
}

export default App;
