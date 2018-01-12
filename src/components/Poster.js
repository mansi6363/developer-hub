import React from 'react'
import PostCard from './PostCard'
import Comments from './Comments'
import { connect } from 'react-redux'
import {setPost} from '../actions'
import {getSinglePost} from '../utils/API'
import { Redirect } from 'react-router-dom'

class Poster extends React.Component{

    state={
        postError:false
    }

    componentWillMount(){

        //extracting url variable
        const url = window.location.pathname;
        const postId = url.substring(url.lastIndexOf('/')+1);

        getSinglePost(postId).then(post=>{
            if(post.error||Object.keys(post).length===0){
                this.setState({postError:true});
            }
            this.props.dispatch(setPost(post))
        });
     }

    render(){
            const post= this.props.post || null;
            if(this.state.postError){
                return (<Redirect to='/error/post/404'/>)
            }
            if(!post)
                return null;
            return(
                <div key={post.id}>
                    <PostCard post={post} poster={true}/>    
                    <Comments postID={post.id}/>
                </div>
        );
    };
}

function mapStateToProps(state){
    return{
        post: state.postReducer.post||null
    }
}

export default connect(mapStateToProps)(Poster);