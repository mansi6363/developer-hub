import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import Rating from './Rating'

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
                        <div className='post-outer' key={post.id}>
                            <div className='post-card'>
                                <Card>
                                    <CardHeader
                                        title= {
                                                <h1 className='post-title'>
                                                    {post.title}
                                                </h1>   
                                                }
                                        subtitle={ 
                                                <div>
                                                    <div className='post-subtitle'>{new Date(post.timestamp).toGMTString()}</div> 
                                                    <div className='post-subtitle'>{`Author: ${post.author}`}</div>
                                                </div>
                                        }
                                        actAsExpander={true}
                                        showExpandableButton={true}
                                        />
                                        <CardText>
                                            <div>
                                                {post.body}
                                            </div>
                                            <Rating voteScore={post.voteScore}/>
                                        </CardText>
                                        <CardText expandable={true}>
                                        Comment
                                    </CardText>
                                </Card>
                            </div>
                        </div>
                    );})}
                
                </div>
            </section>
        );
    }
}

export default PostBox;