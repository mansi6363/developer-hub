import React from 'react'
import PostCard from './PostCard'
import Comments from './Comments'
import { connect } from 'react-redux'

class Poster extends React.Component{

    
    postID=this.props.location.state.postID

    render(){
        return(
            this.props.posts.map(post=>{
                if(post.id===this.postID){
                    return(
                        <div key={post.id}>
                            <PostCard post={post} poster={true}/>    
                            <Comments postID={post.id}/>
                        </div>
                    )
                }
                return null;
            })
        );
    };
}

function mapStateToProps(state){
    return{
        posts: state.posts||[]
    }
}

export default connect(mapStateToProps)(Poster);