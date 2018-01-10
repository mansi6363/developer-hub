import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import PostCard from './PostCard';
import Dialog from 'material-ui/Dialog';
import AddPost from './AddPost'
import { connect } from 'react-redux'
import {updatePosts} from '../actions'
import {getAllPost} from '../utils/API'
import sortBy from 'sort-by'



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
        console.log(this.props.sort);
        let posts = this.props.posts;
        switch(this.props.sort){
            case 1: 
                posts.sort(sortBy('-timestamp'));
                break;
            case 2: 
                posts.sort(sortBy('-voteScore'));
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
                    {posts.map((post)=>{
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
    console.log(state)
    return{
      posts: state.postReducer.posts||[],            //it will create a prop property containing all posts stored in store 
      activeCategory: state.categoryReducer.activeCategory||'ALL',
      sort: state.sortingReducer.sort||0
    }                                   
  }

export default connect(mapStateToProps)(PostBox);