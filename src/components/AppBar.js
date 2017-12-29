import React from 'react';
import { Component } from 'react';
import AppBar from 'material-ui/AppBar';

class AppBarComponent extends Component{
    render(){
        return (
            <AppBar
                title="All Post"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
        );
    }
}

export default AppBarComponent;

