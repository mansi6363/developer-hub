//IMPORTING ACTIONs
import {
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    UP_POST_RATE,
    DOWN_POST_RATE,
    UPDATE_POSTS,
    SET_POST,
    INCREASE_NO_OF_COMMENTS,
    DECREASE_NO_OF_COMMENTS,
} from '../actions/index';

export const initialState = {
    posts: [],      //keep all the post stored
    post: null      //keep active post
}


function postReducer(state=initialState, action){

    switch(action.type){
        case ADD_POST:      // add post action
            return{
                    ...state,
                    posts:[...state.posts, {
                        id: action.id,       //id stored in nextPostID will be id of this post
                        timestamp: action.timestamp,      // will add current timestamp
                        title: action.title,        
                        author: action.author,
                        body: action.body,
                        commentCount: 0,    //will record no of comments
                        category: action.category,
                        voteScore: 1,               //initialized votescore by default value 1
                        deleted: false              //initially deleted property will be false
                    }]
            }
        case EDIT_POST:     //edit post action
            return{
                ...state,
                posts: state.posts.map(post=>{
                    if(post.id !== action.id)       //if post id is not same as edited one 
                        return post;                //will return post with no change
                    return{
                        id: post.id,                //post id will remain same
                        timestamp: post.timestamp,      //timestamp will change according to current time 
                        title: action.title,        //title will change acc to new i/p
                        author: post.author,      //author will change acc to new i/p
                        body: action.body,          //body will change acc to new i/p
                        commentCount: post.commentCount,      //No of comments will remain same
                        category: post.category,  //category will change acc to new i/p
                        voteScore: post.voteScore,  //votescore will not change 
                        deleted: false,              //post deleted will remain false
                    }
                }),
            }
        case DELETE_POST:   //handle delete post action
            return{
                ...state,
                posts: state.posts.filter(post=>(post.id !== action.id)),   // remove post having id same as action id
            }
        case UP_POST_RATE:     //will increse post vote by 1
            return{
                ...state,
                posts: state.posts.map(post=>{
                    if(post.id !== action.id)       //if post id is not same as that of edited one
                        return post;                //return post with no difference
                    return {
                        ...post,
                        voteScore: post.voteScore + 1      //increase vote by 1
                    }
                })
            }
        case DOWN_POST_RATE:
            return{
                ...state,
                posts:state.posts.map(post=>{
                    if(post.id !== action.id)       //if post id is not same as that of edited one
                        return post;                //return post with no difference
                    return{
                        ...post,
                        voteScore: post.voteScore -1        //decrease vote by 1
                    }
                })
            }
        case UPDATE_POSTS:
            return{
                ...state,
                posts: action.posts
            }
        case SET_POST:
            return{
                ...state,
                post: action.post
            }
        case INCREASE_NO_OF_COMMENTS:
            console.log('called');
            return{
                ...state,
                posts: state.posts.map(post=>{
                  if(post.id!==action.id)   
                    return post;
                  else{
                    return{
                        ...post,
                        commentCount: post.commentCount +1
                    }
                  }
                }),
                post:{
                    ...state.post,
                    commentCount: state.post.commentCount + 1
                }
            }
        case DECREASE_NO_OF_COMMENTS:
            return{
                ...state,
                posts: state.posts.map(post=>{
                if(post.id!==action.id)   
                    return post;
                else{
                    return{
                        ...post,
                        commentCount: post.commentCount -1
                    }
                }
                }),
                post:{
                    ...state.post,
                    commentCount: state.post.commentCount - 1
                }
            }
        default:                            // handling default case
            return state;                   //in default case no changes are needed
        
    }
}

export default postReducer;