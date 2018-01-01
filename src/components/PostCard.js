import React from 'react';
import Rating from './Rating';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {Link} from 'react-router-dom'

function postCard(props){
    return (
    <div className='post-outer'>
        <div className='post-card'>
            <Card>
                <CardHeader
                    title= {
                        <h1 className='post-title'>
                            {props.link?
                                <Link to={{
                                    pathname:'/post',
                                    state:{post:props.post}
                                }}>
                                    {props.post.title}
                                </Link>:
                                props.post.title
                            }
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