import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import PostCard from './PostCard';
import Dialog from 'material-ui/Dialog';
import AddPost from './AddPost'
import { connect } from 'react-redux'
import {updatePosts} from '../actions'
import {getAllPost, fetchPostsFromCategory} from '../utils/API'
import sortBy from 'sort-by'



//Post box class renders posts posted by users
class PostBox extends React.Component{

    state={
        addPostOpen:false,
    }

    //LOADING DATA FOR COMPONENT
    componentWillMount(){
        switch(this.props.categoryMode){
            case true:
                const url = window.location.pathname;
                const catUrl= url.substring(url.lastIndexOf('/')+1);    //will contain category
                console.log(catUrl);
                fetchPostsFromCategory(catUrl).then(posts=>{
                this.props.dispatch(updatePosts(posts))
                })
                break;
            case false:
                getAllPost().then(posts=>{
                    this.props.dispatch(updatePosts(posts))
                })
                break;
            default: break;
            }
    }

    //these method will handle add post dialog  
    handleOpenPost = () => {
        this.setState({addPostOpen: true});
      };
    
    handleClosePost = () => {
        this.setState({addPostOpen: false});
      };

    render(){
        let posts = this.props.posts;
        switch(this.props.sort){
            case 1:     //sort by timestamp
                posts.sort(sortBy('-timestamp'));
                break;
            case 2:     //sort by rating
                posts.sort(sortBy('-voteScore'));
                break;
            default:
                break;
        }
        return (
            <section className='PostBox'>
                <div className='AddPostArea'>
                <RaisedButton
                    label="Add Post"
                    labelPosition="after"
                    primary={true}
                    onClick={this.handleOpenPost}
                    icon={<ContentAdd />}
                />
                <Dialog
                    title={<h1>Your Post</h1>}
                    modal={false}
                    open={this.state.addPostOpen}
                    onRequestClose={this.handleClosePost}
                    bodyClassName='dialog'
                    titleClassName='dialog-title'
                    actionsContainerClassName='dialog-action'
                >
                    <AddPost close={this.handleClosePost} open={this.handleOpenPost}/>
                </Dialog>
                </div>
                <div className='PostsArea'>
                {posts.map((post)=>(
                            <PostCard post={post} key={post.id}/>
                    ))}                
                </div>
            </section>
        );
    }
}

function mapStateToProps(state){
    return{
      posts: state.postReducer.posts||[],     //it will create a prop property containing all posts stored in store 
      sort: state.sortingReducer.sort||0
    }                                   
  }

export default connect(mapStateToProps)(PostBox);