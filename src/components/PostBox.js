import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import PostCard from './PostCard';
import Dialog from 'material-ui/Dialog';
import AddPost from './AddPost'
import { connect } from 'react-redux'
import {updatePosts, setActiveCategory} from '../actions'
import {getAllPost, fetchPostsFromCategory} from '../utils/API'
import sortBy from 'sort-by'

//Post box class renders posts posted by users
class PostBox extends React.Component{

    state={
        addPostOpen:false,
        category: null
    }

     load = (update)=>{
        switch(this.props.categoryMode){
            case true:
                const url = window.location.pathname;
                const catUrl= url.substring(url.lastIndexOf('/')+1);    //will contain category
                let category = null;

                if(update&&!update.activeCategory){
                    update.setCat(catUrl);
                }

                if(!this.state.category||this.state.category!==catUrl){
                    category = catUrl
                    this.setState({category:category})
                }
                else
                    category= this.state.category;               
             
                if(update&&this.state.category&&update.activeCategory===this.state.category)
                    return;
            
                fetchPostsFromCategory(category).then(posts=>{
                this.props.setPost(posts)
                })
                break;
            case false:
                getAllPost().then(posts=>{
                    this.props.setPost(posts)
                })
                break;
            default: break;
            }
    }

    //LOADING DATA FOR COMPONENT
    componentWillMount(){
        this.load();
    }

    componentWillReceiveProps(props){
    const url = window.location.pathname;
    const catUrl= url.substring(url.lastIndexOf('/')+1);    //will contain category
    if(!catUrl)
        return;
    if(props.activeCategory){
        this.setState({category: props.activeCategory});
      }
      this.load(props);
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
      sort: state.sortingReducer.sort||0, 
      activeCategory: state.categoryReducer.activeCategory||null
    }                                   
  }

function mapDispatchToProps(dispatch){
    return{
        setCat: (category)=>dispatch(setActiveCategory(category)),
        setPost: (posts)=>dispatch(updatePosts(posts))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostBox);