import React, { Component } from 'react';
import '../App.css';
import Header from './Header'
import Cover from './Cover'
import AppBarComponents from './AppBar'
import PostBox from './PostBox'
import { Route } from 'react-router-dom'
import Poster from './Poster'


class App extends Component {
  render() {
    return (
      <div>
      <Header/>
      <Route exact path='/' render={()=>(
        <div>
          <Cover/>
          <AppBarComponents/>
          <PostBox categoryMode={false}/>
        </div>
      )} />
      <Route exact path='/:category' render={()=>(
        <div>
          <Cover/>
          <AppBarComponents categoryDisable={true}/>
          <PostBox categoryMode={true}/>
        </div>
      )}/>
      <Route path='/post' component={ Poster }/>
      </div>
    );
  }
}

export default App;
