import React from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import {addComment, editComment, increaseNoOfComments} from '../actions/index'
import uuidv1 from "uuid/v1";
import { uploadComment, editServerComment } from '../utils/API'

//This class provide add comment modal in page
//NOTE:-
//unlike its name it can be also used to Edit model
//if you have passes model object as a prop it will act in edit mode
//else it will act in add comment mode

class AddComment extends React.Component{

    //this is style object which will style the component
    style={
        WhiteFont:{
            color:'#FFFFFF'
        }
    }

    //state of componet
    state={
        parentId: this.props.parentID,
        author:'',
        body:'',
        editMode: false
    }

    //this method will  change state to edit mode
    setStateToEditMode = ()=>{
        this.setState({...this.props.comment, editMode: true});
    }

    //this method will add comment in server and redux
    addComment =()=>{

        //extracting data
        const {parentId ,author, body} = this.state;
        
        //genrating unique id
        const id = uuidv1();

        //genrating timestamp
        const timestamp = Date.now();

        //checking entries
        if(parentId && author && body){
            //adding comment
            uploadComment({id, timestamp, body, author, parentId}).then(()=>{
            this.props.addComment(id, parentId, timestamp, body, author);
            this.props.close();
            });
        }
    }

    //this method will edit comment stored in server and redux store
    editComment= ()=>{
        //extracting data
        const {id, body} = this.state;

        //genrating new timestamp
        const timestamp=Date.now();

        //checking data
        if( id  && body){
            //editing comment
            editServerComment({timestamp, body}, id).then(()=>{
            this.props.editComment(id, body);
            this.props.close();
            });
        }
    }

    //this method will handle change of author text field
    handleAuthorChange = (event, value) => this.setState({author:value});

    //this method will handle change of body text field
    handleBodyChange = (event, value) => this.setState({body:value});

    //will check if add comment should run in edit mode or not
    componentWillMount(){
        if(this.props.comment&&!this.state.editMode){
            this.setStateToEditMode();
        }
    }

    render(){
        return(
            <div>
                <TextField
                    floatingLabelText="Name"
                    inputStyle={this.style.WhiteFont}
                    floatingLabelStyle={this.style.WhiteFont}
                    value={this.state.author}
                    onChange={this.handleAuthorChange}
                    disabled={this.state.editMode?true:false}
                /><br />
                <TextField
                    floatingLabelText="Type your comment here..."
                    multiLine={true}
                    textareaStyle={this.style.WhiteFont}
                    fullWidth={true}
                    floatingLabelStyle={this.style.WhiteFont}
                    value={this.state.body}
                    onChange={this.handleBodyChange}
                    rows={3}
                /><br />
                <RaisedButton
                    label="Cancel"
                    backgroundColor='#F44336'
                    onClick={this.props.close}
                    />
                <RaisedButton
                    label="Publish"
                    backgroundColor="#a4c639"
                    keyboardFocused={true}
                    onClick={this.state.editMode?this.editComment:this.addComment} 
                />
            </div>   
        );
    }
}

function mapDispatchToProps(dispatch){
    return{
        addComment: (id, parentID, timestamp, body, author)=>{
            dispatch(addComment(
                id,
                parentID,
                timestamp,
                body,
                author
            ));
            dispatch(increaseNoOfComments(
                parentID
            ));
        },
        editComment:(id, body)=>{
            dispatch(editComment(
                id,
                body
            ));
        }
    }
}

export default connect(undefined, mapDispatchToProps)(AddComment);