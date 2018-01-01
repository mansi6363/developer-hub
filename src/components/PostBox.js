import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import PostCard from './PostCard';
import Dialog from 'material-ui/Dialog';
import AddPost from './AddPost'


//Post box class renders posts posted by users
class PostBox extends React.Component{

    state={
        addPostOpen:false,
    }

    handleOpenPost = () => {
        this.setState({addPostOpen: true});
      };
    
    handleClosePost = () => {
        this.setState({addPostOpen: false});
      };

    render(){

        const actions = [
            <RaisedButton
              label="Cancel"
              backgroundColor='#F44336'
              onClick={this.handleClosePost}
            />,
            <RaisedButton
              label="Post"
              backgroundColor="#a4c639"
              keyboardFocused={true}
              onClick={function(){}} //TODO: set onClick Listener
            />,
          ];

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
                    title={<h1>Add Post</h1>}
                    actions={actions}
                    modal={false}
                    open={this.state.addPostOpen}
                    onRequestClose={this.handleClose}
                    bodyClassName='dialog'
                    titleClassName='dialog-title'
                    actionsContainerClassName='dialog-action'
                >
                    <AddPost/>
                </Dialog>
                </div>
                <div className='PostsArea'>
                    {this.props.posts.map((post)=>{
                        return (
                        <PostCard post={post} key={post.id} link={true}/>
                    );})}
                
                </div>
            </section>
        );
    }
}

export default PostBox;