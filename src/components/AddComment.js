import React from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';


//This class provide add comment modal in page
//NOTE:-
//unlike its name it can be also used to Edit model
//if you have passes model object as a prop it will act in edit mode
//else it will act in add comment mode

class AddComment extends React.Component{

    style={
        WhiteFont:{
            color:'#FFFFFF'
        },
        menuStyle:{
            backgroundColor:'rgb(0, 188, 212)'
        }
    }

    state={
        parentid: this.props.parentID,
        author:'',
        body:'',
        editMode: false
    }

    //this method will  change state to edit mode
    setStateToEditMode = ()=>{
        this.setState({...this.props.comment, editMode: true});
    }


    addComment =()=>{

        console.log('adding comment');
        //extracting data
        const {parentid ,author, body} = this.state;

        //checking entries
        if(parentid && author && body){
            //add comment
        }
        else{
            return;     //error condition due to insuffiecient data
                        //TODO: handle this
        }
    }


    editComment= ()=>{
        console.log('edit comment started');
        //extracting data
        const {id, parentid, author, body} = this.state;

        //checking data
        if(parentid && id && author && body){
            //edit comment
        }
    }


    handleAuthorChange = (event, value) => this.setState({author:value});

    handleBodyChange = (event, value) => this.setState({body:value});

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


export default AddComment;