import React from 'react'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { addPost, editPost } from '../actions' 

const categories=['react', 'javascript', 'angular', 'udacity'];

//This class provide add post modal in page
//NOTE:-
//unlike its name it can be also used to Edit post
//if you have passes post object as a prop it will act in edit mode
//else it will act in add post mode

class AddPost extends React.Component{

    style={
        WhiteFont:{
            color:'#FFFFFF'
        },
        menuStyle:{
            backgroundColor:'rgb(0, 188, 212)'
        }
    }

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


    addPost =()=>{
        //extracting data
        const {category, author, title, body} = this.state;

        //checking entries
        if(categories && author && title && body){
            this.props.addPostToStore(title, author, body, category);
            this.props.close();
        }
        else{
            return;     //error condition due to insuffiecient data
                        //TODO: handle this
        }
    }


    editPost= ()=>{
        console.log('edit post started');
        //extracting data
        const {id, category, author, title, body} = this.state;

        //checking data
        if(id && category && author && title && body){
            this.props.editPostInStore(id, title, author, body, category );
            this.props.close();
        }
    }

    handleCategoryChange = (event, index, value) => this.setState({category:value});

    handleAuthorChange = (event, value) => this.setState({author:value});

    handleTitleChange = (event, value) => this.setState({title:value});

    handleBodyChange = (event, value) => this.setState({body:value});

    componentWillMount(){
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
                >
                    {categories.map((category)=>(
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
        addPostToStore: (title, author, body, category)=> (dispatch(addPost(
            title,
            author,
            body,
            category
        ))),
        editPostInStore: (id, title, author, body, category)=>(dispatch(editPost(
            id||null,
            title||null,
            body||null,
            author||null,
            category||null
        )))
    }
}

function mapStateToProps(){
    return{}
}

export default connect(mapStateToProps,mapDispatchToProps)(AddPost);