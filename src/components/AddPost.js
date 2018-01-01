import React from 'react'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

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
        author:null,
        title:null,
        body:null
    }

    handleCategoryChange = (event, index, value) => this.setState({category:value});

    handleAuthorChange = (event, index, value) => this.setState({author:value});

    handleTitleChange = (event, index, value) => this.setState({title:value});

    handleBodyChange = (event, index, value) => this.setState({body:value});

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
            </div>   
        );
    }
}

export default AddPost;