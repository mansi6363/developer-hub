import React from 'react'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { addPost, editPost, addCategories} from '../actions'; 
import uuidv1 from "uuid/v1";
import {sendPost, sendEditedPost, getAllCategories} from '../utils/API'

//This class provide add post modal in page
//NOTE:-
//unlike its name it can be also used to Edit post
//if you have passes post object as a prop it will act in edit mode
//else it will act in add post mode

class AddPost extends React.Component{

    //this is style object which will style the component
    style={
        WhiteFont:{
            color:'#FFFFFF'
        },
        menuStyle:{
            backgroundColor:'rgb(0, 188, 212)'
        }
    }

    //state of component
    state={
        category:null,
        author:'',
        title:'',
        body:'',
        editMode: false
    }

    //this method will  change state to edit mode
    setStateToEditMode = ()=>{
        this.setState({...this.props.post, editMode: true});
    }


    //this method will add post in redux store and server
    addPost =()=>{
        //extracting data
        const {category, author, title, body} = this.state;
        
        //genrating id
        const id = uuidv1();

        //genrating time
        const timestamp = Date.now();

        //checking entries
        if(category && author && title && body){
            sendPost({id, timestamp, title, author, body, category}).then(()=>{
            this.props.addPostToStore(id, timestamp, title, author, body, category);
            this.props.close();
            })
        }
    }

    //this method will edit post stored in server and redux store
    editPost= ()=>{
        //extracting data
        const {id, title, body} = this.state;

        //checking data
        if(id  && title && body){
            sendEditedPost({title, body}, id).then(()=>{
            this.props.editPostInStore(id, title, body );
            this.props.close();
            })
        }
    }

     //this method will handle change of category field
    handleCategoryChange = (event, index, value) => this.setState({category:value});

     //this method will handle change of author text field
    handleAuthorChange = (event, value) => this.setState({author:value});

     //this method will handle change of title text field
    handleTitleChange = (event, value) => this.setState({title:value});

     //this method will handle change of body text field
    handleBodyChange = (event, value) => this.setState({body:value});

    //checking to run add post in edit mode or not
    componentWillMount(){
        if(this.props.categories.length===0){
            getAllCategories().then(categories=>{
                this.props.addCategoriesToStore(categories)
            });
        }
        if(this.props.post&&!this.state.editMode){
            this.setStateToEditMode();
        }
    }

    render(){
        return(
            <div>
                <SelectField
                    floatingLabelText="Category"
                    floatingLabelStyle={this.style.WhiteFont}
                    menuItemStyle={this.style.menuStyle}
                    value={this.state.category}
                    onChange={this.handleCategoryChange}
                    disabled = {this.state.editMode?true:false}
                >
                    {this.props.categories.map((category)=>(
                        <MenuItem key={category} value={category} 
                            primaryText={<span className='menu-item'>{category}</span>} />
                    ))}
                </SelectField><br/>
                <TextField
                    floatingLabelText="Title"
                    inputStyle={this.style.WhiteFont}
                    floatingLabelStyle={this.style.WhiteFont}
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                /><br />
                <TextField
                    floatingLabelText="Name"
                    inputStyle={this.style.WhiteFont}
                    floatingLabelStyle={this.style.WhiteFont}
                    value={this.state.author}
                    onChange={this.handleAuthorChange}
                    disabled = {this.state.editMode?true:false}
                /><br />
                <TextField
                    floatingLabelText="Type your post here..."
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
                    label="Post"
                    backgroundColor="#a4c639"
                    keyboardFocused={true}
                    onClick={this.state.editMode?this.editPost:this.addPost} 
                />
            </div>   
        );
    }
}

function mapDispatchToProps(dispatch, props){
    return{
        ...props,
        addPostToStore: (id, timestamp, title, author, body, category)=> (dispatch(addPost(
            id,
            timestamp,
            title,
            author,
            body,
            category
        ))),
        editPostInStore: (id, title, body)=>(dispatch(editPost(
            id||null,
            title||null,
            body||null
        ))),
        addCategoriesToStore: (categories)=> dispatch(addCategories(categories.map(category=>category.name)))
    }
}

function mapStateToProps(state){
    return{
        categories: state.categoryReducer.categories
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddPost);