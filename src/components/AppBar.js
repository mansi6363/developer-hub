import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import { connect } from 'react-redux';
import {getAllCategories} from '../utils/API';
import {addCategories, setActiveCategory, setSort} from '../actions/index';
import FlatButton from 'material-ui/FlatButton';

class AppBarComponents extends React.Component{
    
    state={
        open:false,
        openSorting:false
    }

    //will toggle side drawer
    handleToggle = () => this.setState({open: !this.state.open});

    //will close side drawer
    handleClose = () => this.setState({open: false});

    //this method will sort post wrt time 
    sortByTime = () => {
        this.props.dispatch(setSort(1));
        this.handleSortClose();
    } 

    //this method will sort post wrt Rating
    sortByRating = () => {
        this.props.dispatch(setSort(2));
        this.handleSortClose();
    }

    //this method will handle event when sort button will click
    handleSortClick = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
        openSorting: true,
        anchorEl: event.currentTarget,
        });
    }

    //this method will close sorting box
    handleSortClose = () => {
        this.setState({
            openSorting: false,
          });
    }

    //this method is called when sorting options are clicked
    handleSelect = (category) => {
        return ()=>{
            this.props.dispatch(setActiveCategory(category));
            this.handleClose();
        }
    }

    //loading component data
    componentWillMount(){
        getAllCategories().then(categories=>{
            this.props.dispatch(addCategories(categories.map(category=>category.name)))
        });
    }
    
    render(){
        console.log(this.props)
        return (
            <div>
                <AppBar
                    title="All Post"
                    onLeftIconButtonClick={this.handleToggle}
                    iconElementRight={<div>
                                        <FlatButton 
                                            label="sort"
                                            onClick={this.handleSortClick}
                                        />
                                        <Popover
                                        open={this.state.openSorting}
                                        anchorEl={this.state.anchorEl}
                                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                        onRequestClose={this.handleSortClose}
                                        >
                                        <Menu>
                                            <MenuItem primaryText="Sort by Time" onClick={this.sortByTime} />
                                            <MenuItem primaryText="Sort by Rating" onClick={this.sortByRating}/>
                                        </Menu>
                                        </Popover>
                                    </div>}
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

