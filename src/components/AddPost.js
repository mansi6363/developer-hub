import React from 'react'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { addPost } from '../actions' 

const categories=['react', 'javascript', 'angular', 'udacity'];

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
        body:''
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


    handleCategoryChange = (event, index, value) => this.setState({category:value});

    handleAuthorChange = (event, value) => this.setState({author:value});

    handleTitleChange = (event, value) => this.setState({title:value});

    handleBodyChange = (event, value) => this.setState({body:value});

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
                    onClick={this.addPost} 
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
        )))
    }
}

function mapStateToProps(){
    return{

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddPost);