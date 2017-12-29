import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';

//Post box class renders posts posted by users
class PostBox extends React.Component{

    style={
        chip:{
            marginTop:15,
            padding:5,
            color:'#ffffff',
            backgroundColor:'rgb(0, 188, 212)',
            display: 'inline'
        }
    }
    
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
                                            <div>
                                                                 
                                            </div>
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