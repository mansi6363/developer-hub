//importing actions 
import {
    ADD_COMMENT,
    DELETE_COMMENT,
    UP_COMMENT_RATE,
    DOWN_COMMENT_RATE,
    EDIT_COMMENT,
    UPDATE_COMMENTS
} from '../actions/index'

export const initialState = {
    comments:[],     //keep tracts of all stored comment
}

function commentReducer(state=initialState, action){

    switch(action.type){
        case ADD_COMMENT:       //will handle add comment action
            return{
                ...state,
                comments:[
                    ...state.comments,
                    {
                        id: action.id,    //id will be taken from nextCommentID
                        parentId: action.parentId,  //parentID is id of the post
                        timestamp: action.timestamp,      //will take current timestamp
                        body: action.body,          //will store body of comment
                        author: action.author,      //will store author of comment
                        voteScore: 1,               //default value of vote is 1
                        deleted: false,
                        parentDeleted: false
                    }
                ]
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
                            parentId: comment.parentId,
                            timestamp: comment.timestamp,
                            body: action.body,
                            author: comment.author,
                            voteScore: comment.voteScore,
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
        case UPDATE_COMMENTS:
            return{
                ...state,
                comments: action.comments
            }
        default:
            return state;        
    }
}

export default commentReducer;