import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import PostCard from './PostCard';
import Dialog from 'material-ui/Dialog';
import AddPost from './AddPost'
import { connect } from 'react-redux'
import {updatePosts} from '../actions'
import {getAllPost} from '../utils/API'



//Post box class renders posts posted by users
class PostBox extends React.Component{

    state={
        addPostOpen:false,
    }

    componentWillMount(){
       getAllPost().then(posts=>{
           this.props.dispatch(updatePosts(posts))
       })
    }

    handleOpenPost = () => {
        this.setState({addPostOpen: true});
      };
    
    handleClosePost = () => {
        this.setState({addPostOpen: false});
      };

    render(){
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
                    {this.props.posts.map((post)=>{
                        switch(this.props.activeCategory){
                            case 'ALL':
                                return (
                                    <PostCard post={post} key={post.id}/>
                                )
                            default:
                                if(this.props.activeCategory===post.category){
                                    return (
                                        <PostCard post={post} key={post.id}/>
                                    )   
                                }
                                else 
                                    return null
                        }
                        })}
                
                </div>
            </section>
        );
    }
}

function mapStateToProps(state){
    return{
      posts: state.postReducer.posts||[],            //it will create a prop property containing all posts stored in store 
      activeCategory: state.categoryReducer.activeCategory||'ALL'
    }                                   
  }

export default connect(mapStateToProps)(PostBox);