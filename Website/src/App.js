import React, { Component } from 'react';
import logo from './logo.svg';
import FacebookLoginComponent from './facebookLoginComponent'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FacebookLoginComponent />
        <h1>Wine Cooler App!</h1>
        
      </div>
    );
  }
}

export default App;
