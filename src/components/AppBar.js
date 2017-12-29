import React from 'react';
import AppBar from 'material-ui/AppBar';

class AppBarComponent extends React.Component{
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

