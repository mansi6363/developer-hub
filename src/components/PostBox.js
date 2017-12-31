import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import PostCard from './PostCard';
import Dialog from 'material-ui/Dialog';

//Post box class renders posts posted by users
class PostBox extends React.Component{

    state={
        addPostOpen:false
    }

    handleOpenPost = () => {
        this.setState({addPostOpen: true});
      };
    
    handleClosePost = () => {
        this.setState({addPostOpen: false});
      };

    render(){

        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClosePost}
            />,
            <FlatButton
              label="Post"
              primary={true}
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
                    title="Add Post"
                    actions={actions}
                    modal={false}
                    open={this.state.addPostOpen}
                    onRequestClose={this.handleClose}
                >
                    Hello
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