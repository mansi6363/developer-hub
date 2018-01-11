import React from 'react'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Loader from 'react-loader'
import Paper from 'material-ui/Paper';
import Rating from './Rating'
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import AddComment from './AddComment';
import { connect } from 'react-redux'
import { upCommentRate, downCommentRate, deleteComment } from '../actions/index'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import {getComments, deleteCommentFromServer, voteServerComment} from '../utils/API'
import { updateComments, decreaseNoOfComments } from '../actions'

class Comments extends React.Component{

    state= {
        comments:[],
        loaded:true,
        addCommentDialog:false,
        commentToEdit: null
    }

    //this method will upVote comment 
    upVote=(id)=>{
        return ()=>{
            voteServerComment(id, 'upVote').then(()=>
            this.props.dispatch(upCommentRate(id))
            );
        }
    }

    //this method will downVote comment
    downVote=(id)=>{
        return ()=>{
            voteServerComment(id, 'downVote').then(()=>
            this.props.dispatch(downCommentRate(id))
            );
        }
    }

    //will delete comment
    deleteComment= (id, parentId)=>{
        return ()=>{
            deleteCommentFromServer(id).then(()=>{
            this.props.dispatch(deleteComment(id));
            this.props.dispatch(decreaseNoOfComments(parentId));
            });
        }
    }

    //will edit comment
    editComment=(comment)=>{
        return ()=> (this.setState({
            addCommentDialog:true,
            commentToEdit: comment
        }))
    }

    //loading component data
    componentWillMount(){
        ListItem.defaultProps.disabled=true;
        getComments(this.props.postID).then(comments=>{
            this.props.dispatch(updateComments(comments)) 
        });
    }

    //handle state when data is loaded
    componentDidMount(){
        this.setState({
            comments:this.props.comments.filter((comment)=>(comment.parentId === this.props.postID))||[],
            loaded: true
        });
    }

    //will run when component recive props ultimately when redux state is changed
    componentWillReceiveProps(props){
        this.setState({
            comments:props.comments.filter((comment)=>(comment.parentId === props.postID)),
            loaded: true
        });
    }

    //these method will handle ADD COMMENT DIALOG

    handleAddCommentOpen= ()=>{
        this.setState({addCommentDialog:true});
    }

    handleAddCommentClose= ()=>{
        this.setState({addCommentDialog:false, commentToEdit: false});
    }

    render(){
        return(
            <div>
                <div className='add-comment-area'>
                    <RaisedButton
                        label="add comment"
                        labelPosition="after"
                        primary={true}
                        icon={<ContentAdd />}
                        onClick={this.handleAddCommentOpen}
                    />
                </div>
                <Dialog
                    title='Add Comment'
                    modal={false}
                    open={this.state.addCommentDialog}
                    onRequestClose={this.handleAddCommentClose}
                    bodyClassName='dialog'
                    titleClassName='dialog-title'
                >
                    <AddComment 
                        open={this.handleAddCommentOpen} 
                        close={this.handleAddCommentClose} 
                        parentID={this.props.postID}
                        comment={this.state.commentToEdit}
                    />

                </Dialog>
                <Paper className='comments-section' zDepth={3}>
                    <List>
                        <Subheader><h2>Comments</h2></Subheader>
                        <Loader loaded={this.state.loaded} shadow={true}>
                            {this.state.comments.map(comment=>(
                                <div key={comment.id}>
                                    <ListItem
                                        primaryText={
                                            <div>
                                                <h3 className='comment-author'>
                                                    {comment.author}
                                                </h3>
                                                <div className='post-edit-options'>
                                                    <EditIcon onClick={this.editComment(comment)}/>
                                                    <DeleteIcon onClick={this.deleteComment(comment.id, 
                                                        comment.parentId)}/>
                                                </div>
                                                <div className='comment'>
                                                    {comment.body}
                                                </div>
                                                <Rating 
                                                    voteScore={comment.voteScore}
                                                    up={this.upVote(comment.id)}
                                                    down={this.downVote(comment.id)}
                                                />
                                            </div>
                                        }
                                        secondaryText={
                                            <div className='comment-sec'>
                                                {new Date(comment.timestamp).toGMTString()}
                                            </div>
                                        }
                                    />
                                    <Divider/>
                                </div>
                            ))}
                        </Loader>
                    </List>
                </Paper>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        comments: state.commentReducer.comments||[]
    }
}

export default connect(mapStateToProps)(Comments);