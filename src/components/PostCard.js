import React from 'react';
import Rating from './Rating';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

function postCard(props){
    return (
    <div className='post-outer'>
        <div className='post-card'>
            <Card>
                <CardHeader
                    title= {
                        <h1 className='post-title'>
                            {props.post.title}
                        </h1>   
                    }
                    subtitle={ 
                        <div>
                            <div className='post-subtitle'>{new Date(props.post.timestamp).toGMTString()}</div> 
                            <div className='post-subtitle'>{`Author: ${props.post.author}`}</div>
                        </div>
                    }
                />
                <CardText>
                    <div>
                        {props.post.body}
                    </div>
                    <Rating voteScore={props.post.voteScore}/>
                </CardText>
            </Card>
        </div>
    </div>
    );
}

export default postCard;