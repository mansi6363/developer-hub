import React, { Component } from 'react';
import '../App.css';
import Header from './Header'
import Cover from './Cover'
import AppBarComponents from './AppBar'
import PostBox from './PostBox'
import { Route } from 'react-router-dom'
import Poster from './Poster'
import Error404 from './error404'

class App extends Component {
  render() {
    return (
      <div>
      <Route exact path='/' render={()=>(
        <div>
          <Header/>
          <Cover/>
          <AppBarComponents/>
          <PostBox categoryMode={false}/>
        </div>
      )} />
      <Route exact path='/:category' render={()=>(
        <div>
          <Header/>
          <Cover/>
          <AppBarComponents />
          <PostBox categoryMode={true}/>
        </div>
      )}/>
      <Route exact path='/:category/:postID' render={()=>(
        <div>
          <AppBarComponents />
          <Poster/>
        </div>
      )}/>
      <Route exact path='/error/post/404' render={()=>(
       <div>
          <AppBarComponents />
          <Error404/>
       </div>
      )}/>
      </div>
    );
  }
}

export default App;
