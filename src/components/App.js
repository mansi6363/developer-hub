import React, { Component } from 'react';
import '../App.css';
import Header from './Header'
import Cover from './Cover'
import AppBarComponent from './AppBar'
import PostBox from './PostBox'

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

class App extends Component {
  render() {
    return (
      <div>
      <Header/>
      <Cover/>
      <AppBarComponent/>
      <PostBox posts={posts}/>
      </div>
    );
  }
}

export default App;
