import React, { Component } from 'react';
import '../App.css';
import Header from './Header'
import Cover from './Cover'
import AppBarComponents from './AppBar'
import PostBox from './PostBox'
import { Route } from 'react-router-dom'
import Poster from './Poster'
import { connect } from 'react-redux'

const posts = [
  {
    id: 1,
    timestamp: 1514580092247,
    title: 'react',
    body: 'react is one of the most popular javascript library',
    author: 'everyone',
    category:'react',
    voteScore: 3,
    delete: false
  },
  {
    id: 2,
    timestamp: 1514580093247,
    title: 'Angular',
    body: 'Angular is one of the most popular javascript library',
    author: 'Someone',
    voteScore: 3,
    delete: false
  }
];

const categories=['All','react', 'javascript', 'angular', 'udacity'];

class App extends Component {
  render() {
    return (
      <div>
      <Header/>
      <Route exact path='/' render={()=>(
        <div>
          <Cover/>
          <AppBarComponents categories={categories}/>
          <PostBox/>
        </div>
      )} />
      <Route path='/post' component={ Poster }/>
      </div>
    );
  }
}

export default App;
