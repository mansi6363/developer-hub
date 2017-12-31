import React from 'react'
import PostCard from './PostCard'
import Comments from './Comments'

class Poster extends React.Component{

    state={
        post:this.props.location.state.post
    }

    render(){
        return(
            <div>
                <PostCard post={this.state.post}/>    
                <Comments postID={this.state.post.id}/>
            </div>
        );
    };
}

export default Poster;