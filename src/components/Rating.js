import React from 'react';
import Paper from 'material-ui/Paper';
import Up from 'material-ui/svg-icons/action/thumb-up';
import Down from 'material-ui/svg-icons/action/thumb-down';

const style={
    paper:{
        marginLeft:15,
        marginRight:15,
        padding: 10,
        display: 'inline-block'
    }
}
function rating(props){
    return (
        <div className='rating-section'>
            <div className='rating-icon' onClick={props.up}><Up/></div>
                <Paper style={style.paper}>{props.voteScore}</Paper>        
            <div className='rating-icon' onClick={props.down}><Down/></div> 
        </div>
    );
}

export default rating;