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

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    sortByTime = () => {
        this.props.dispatch(setSort(1));
        this.handleSortClose();
    } 

    sortByRating = () => {
        this.props.dispatch(setSort(2));
        this.handleSortClose();
    }

    handleSortClick = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
        openSorting: true,
        anchorEl: event.currentTarget,
        });
    }

    handleSortClose = () => {
        this.setState({
            openSorting: false,
          });
    }

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

