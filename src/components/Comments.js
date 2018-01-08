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
import { upCommentRate, downCommentRate } from '../actions/index'


class Comments extends React.Component{

    state= {
        comments:[],
        loaded:true,
        addCommentDialog:true
    }

    upVote=(id)=>{
        return ()=>this.props.dispatch(upCommentRate(id))
    }

    downVote=(id)=>{
        return ()=>this.props.dispatch(downCommentRate(id))
    }

    componentWillMount(){
        ListItem.defaultProps.disabled=true;
    }

    componentDidMount(){
        this.setState({
            comments:this.props.comments.filter((comment)=>(comment.parentID === this.props.postID))||[],
            loaded: true
        });
    }

    componentWillReceiveProps(props){
        this.setState({
            comments:props.comments.filter((comment)=>(comment.parentID === props.postID)),
            loaded: true
        });
    }

    handleAddCommentOpen= ()=>{
        this.setState({addCommentDialog:true});
    }

    handleAddCommentClose= ()=>{
        this.setState({addCommentDialog:false});
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