//importing actions 
import {
    ADD_COMMENT,
    DELETE_COMMENT,
    UP_COMMENT_RATE,
    DOWN_COMMENT_RATE,
    EDIT_COMMENT
} from '../actions/index'

//importing initial state
import { initialState } from './initialState';

function commentReducer(state=initialState, action){

    switch(action.type){
        case ADD_COMMENT:       //will handle add comment action
            return{
                ...state,
                comments:[
                    ...state.comments,
                    {
                        id: state.nextCommentID,    //id will be taken from nextCommentID
                        parentID: action.parentID,  //parentID is id of the post
                        timestamp: Date.now(),      //will take current timestamp
                        body: action.body,          //will store body of comment
                        author: action.author,      //will store author of comment
                        voteScore: 1,               //default value of vote is 1
                        deleted: false,
                        parentDeleted: false
                    }
                ],
                nextCommentID: nextCommentID +1     //increasing nextCommentPost
            }
        case EDIT_COMMENT:
            return{
                ...state,
                comments: state.comments.map(comment=>{
                    if(comment.id !== action.id)    //checking if comment id is same as that of our target comment
                        return comment;             //if not returning same comment
                    else{   
                        return{                     //else will retrun edited version of our comment
                            id: comment.id,
                            parentID: comment.parentID,
                            timestamp: Date.now(),
                            body: action.body,
                            author: action.author,
                            voteScore: action.voteScore,
                            deleted: false,
                            parentDeleted: false
                        }
                    }
                })
            }
        case DELETE_COMMENT:
            return{
                ...state,
                comments: state.comments.filter(comment=>(comment.id !== action.id))    //will filter out that comment
            }
        case UP_COMMENT_RATE:
            return{
                ...state,
                comments: state.comments.map(comment=>{ 
                    if(comment.id !== action.id)    //checking if comment id is same as that of our target comment
                        return comment;             //if not returning same comment
                    else{
                        return{
                            ...comment,
                            voteScore: comment.voteScore + 1    //incresing comment voteScore
                        }
                    }
                })
            }
        case DOWN_COMMENT_RATE:
            return{
                ...state,
                comments: state.comments.map(comment=>{
                    if(comment.id !== action.id)    //checking if comment id is same as that of our target comment
                        return comment;             //if not returning same comment
                    else{
                        return{
                            ...comment,
                            voteScore: comment.voteScore - 1    //decreasing comment voteScore
                        }
                    }
                })
            }
        default:
            return state;        
    }
}

export default commentReducer;