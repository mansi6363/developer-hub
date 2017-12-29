import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Header from './Header'
import Cover from './Cover'
import AppBarComponent from './AppBar'

class App extends Component {
  render() {
    return (
      <div>
      <Header/>
      <Cover/>
      <AppBarComponent/>
      </div>
    );
  }
}

export default App;
