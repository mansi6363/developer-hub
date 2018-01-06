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
import AddComment from './AddComment'

const comments=[
    {
        id:1,
        parentId:1,
        timestamp:1514580193247,
        body:'hell yeah!!',
        author:'Anyone',
        voteScore:2,
        deleted:false,
        parentDeleted:false
    },
    {
        id:2,
        parentId:1,
        timestamp:1514581193247,
        body:'hmm i m kinda angular fan',
        author:'Someone',
        voteScore:1,
        deleted:false,
        parentDeleted:false
    },
    {
        id:3,
        parentId:2,
        timestamp:151480293247,
        body:'hmm',
        author:'Anyone',
        voteScore:2,
        deleted:false,
        parentDeleted:false
    }
];

class Comments extends React.Component{

    state= {
        comments:[],
        loaded:false,
        addCommentDialog:true
    }

    componentWillMount(){
        ListItem.defaultProps.disabled=true;
    }

    componentDidMount(){
        this.setState({
            comments:comments.filter((comment)=>(comment.parentId === this.props.postID)),
            loaded:true
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
                                                <Rating voteScore={comment.voteScore}/>
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

export default Comments;