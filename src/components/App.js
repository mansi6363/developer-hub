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

    console.log(this.props);
    return (
      <div>
      <Header/>
      <Route exact path='/' render={()=>(
        <div>
          <Cover/>
          <AppBarComponents categories={categories}/>
          <PostBox posts={posts}/>
        </div>
      )} />
      <Route path='/post' component={ Poster }/>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    posts: state.posts            //it will create a prop property containing all posts stored in store 
  }
}

export default connect(mapStateToProps)(App);
