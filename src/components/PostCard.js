import React from 'react';
import Rating from './Rating';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {Link, withRouter} from 'react-router-dom';
import {upPostRate, downPostRate, deletePost} from '../actions';
import { connect } from 'react-redux';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import  AddPost  from './AddPost';
import Dialog from 'material-ui/Dialog';
import {votePost, deletePostOnline} from '../utils/API'

class PostCard extends React.Component{

    state={
        editPostOpen:false
    }

    //will upvote post
    upVote = ()=>{
        votePost(this.props.post.id, 'upVote').then(()=>
        this.props.dispatch(upPostRate(this.props.post.id)));
    }

    //will downVote post
    downVote = ()=>{
        votePost(this.props.post.id, 'downVote').then(()=>
        this.props.dispatch(downPostRate(this.props.post.id)));
    }

    //will delete post
    handleDeletePost = ()=>{
        deletePostOnline(this.props.post.id).then(()=>{
        this.props.dispatch(deletePost(this.props.post.id));       
        if(this.props.location.pathname==='/post') 
            this.props.history.push('/');
        })
    }

    //These method will handle edit post dialog
    handleOpenEditPost = () => {
        this.setState({editPostOpen: true});
    };
    

    handleCloseEditPost = () => {
        this.setState({editPostOpen: false});
    };


    render(){
        return (
            <div className='post-outer'>
                <Dialog
                    title={<h1>Edit Post</h1>}
                    modal={false}
                    open={this.state.editPostOpen}
                    onRequestClose={this.handleCloseEditPost}
                    bodyClassName='dialog'
                    titleClassName='dialog-title'
                    actionsContainerClassName='dialog-action'
                >
                    <AddPost 
                        close={this.handleCloseEditPost} 
                        open={this.handleOpenEditPost}
                        post={this.props.post||false}
                        />
                </Dialog>
                <div className='post-card'>
                    <Card>
                        <CardHeader
                            title= {
                                <div>
                                    <h1 className='post-title'>
                                            {!this.props.poster?
                                                <Link to={{
                                                    pathname:`/${this.props.post.category}/${this.props.post.id}`,
                                                    state:{postID:this.props.post.id}
                                                }}>
                                                    {this.props.post.title}
                                                </Link>:
                                                this.props.post.title
                                            }
                                    </h1>
                                </div>   
                            }
                            subtitle={ 
                                <div>
                                    <div className='post-subtitle'>{new Date(this.props.post.timestamp).toGMTString()}</div> 
                                    <div className='post-subtitle'>{`Author: ${this.props.post.author}`}</div>
                                </div>
                            }
        
                        />
                        <CardText>
                            <div>
                            <div className='post-edit-options'>
                            <EditIcon onClick={this.handleOpenEditPost}/>
                            <DeleteIcon onClick={this.handleDeletePost}/>
                            </div>
                                {this.props.post.body}
                            </div>
                            <Rating voteScore={this.props.post.voteScore} up={this.upVote} down={this.downVote}/>
                            <div className='comment-count'>No Of Comments: {this.props.post.commentCount}</div>
                        </CardText>
                    </Card>
                </div>
            </div>
            );
        }
}

    

export default connect()(withRouter(PostCard));