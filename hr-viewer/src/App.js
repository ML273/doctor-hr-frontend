import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GetData from './GetData.js';
import Text from './TextField.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Heart Rate Viewer</h2>
        </div>
        <p className="App-intro">
          To get started, enter valid email and click on <code>GIVE ME DATA</code>.
        </p>
      <GetData />
      </div>  
    );
  }
}

export default App;
