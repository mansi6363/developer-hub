import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import {getAllCategories} from '../utils/API';
import {addCategories, setActiveCategory} from '../actions/index'

class AppBarComponents extends React.Component{
    
    state={
        open:false
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    handleSelect = (category) => {
        return ()=>{
            this.props.dispatch(setActiveCategory(category));
            this.handleClose();
        }
    }

    componentWillMount(){
        console.log('start');
        getAllCategories().then(categories=>{
            console.log(this.props)
           
            this.props.dispatch(addCategories(categories.map(category=>category.name)))
        });
    }
    
    render(){
        console.log(this.props)
        return (
            <div>
                <AppBar
                    title="All Post"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonClick={this.handleToggle}
                />
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    {this.props.categories.map((category=>(
                        <MenuItem 
                            onClick={this.handleSelect(category)} 
                            key={category}
                            disabled={this.props.activeCategory===category?true:false}
                            >
                                {category}
                            </MenuItem>      
                    )))}
                </Drawer>
            </div>
        );
    }
}

function mapStateToProps(state){
    console.log(state)
    return{
        categories: ['ALL', ...state.categoryReducer.categories],
        activeCategory: state.categoryReducer.activeCategory||'ALL'
    }
}

export default connect(mapStateToProps)(AppBarComponents);

