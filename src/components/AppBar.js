import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class AppBarComponents extends React.Component{
    
    state={
        open:false
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});
    
    render(){
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
                        <MenuItem onClick={this.handleClose} key={category}>{category}</MenuItem>      
                    )))}
                </Drawer>
            </div>
        );
    }
}

export default AppBarComponents;

