import React from 'react'
import PostCard from './PostCard'
import Comments from './Comments'
import { connect } from 'react-redux'
import {updatePosts} from '../actions'
import {getAllPost} from '../utils/API'


class Poster extends React.Component{

    
    postID=this.props.location.state.postID;

    componentWillMount(){
        if(this.props.posts.length!==0)
            return;
        
        getAllPost().then(posts=>{
            this.props.dispatch(updatePosts(posts))
        });
     }

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
        posts: state.postReducer.posts||[]
    }
}

export default connect(mapStateToProps)(Poster);