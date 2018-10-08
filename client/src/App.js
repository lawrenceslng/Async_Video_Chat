import React, { Component } from 'react';
import logo from './logo.svg';
import Header from './components/header';
import Footer from './components/footer';
import Carousel from './components/carousel';
import AdminPanel from './components/AdminPanel';
import './App.css';

class App extends Component {



  render() {
    return (
      <div className="App">
        <Header />
        <Carousel />

        <Footer />
      </div>
    );
  }
}

export default App;
