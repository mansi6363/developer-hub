import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import PostCard from './PostCard';

//Post box class renders posts posted by users
class PostBox extends React.Component{

    render(){
        return (
            <section className='PostBox'>
                <div className='AddPostArea'>
                <RaisedButton
                    label="Add Post"
                    labelPosition="after"
                    primary={true}
                    icon={<ContentAdd />}
                />
                </div>
                <div className='PostsArea'>
                    {this.props.posts.map((post)=>{
                        return (
                        <PostCard post={post} key={post.id}/>
                    );})}
                
                </div>
            </section>
        );
    }
}

export default PostBox;