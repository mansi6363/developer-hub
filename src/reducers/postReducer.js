//IMPORTING ACTIONS RELATED TO POST
import {
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    UP_POST_RATE,
    DOWN_POST_RATE
} from '../actions/index'

const initialPostState = {
    posts: [],      //keep all the post stored
    nextPostID:1    //keep account of id of new post
}

function postReducer(state=initialPostState, action){

    switch(action.type){
        case ADD_POST:      // add post action
            return{
                    ...state,
                    posts:[...state.posts, {
                        id: state.nextPostID,       //id stored in nextPostID will be id of this post
                        timestamp: Date.now(),      // will add current timestamp
                        title: action.title,        
                        author: action.author,
                        body: action.body,
                        category: action.category,
                        voteScore: 1,               //initialized votescore by default value 1
                        deleted: false              //initially deleted property will be false
                    }],
                    nextPostID: state.nextPostID + 1
            }
        case EDIT_POST:     //edit post action
            return{
                ...state,
                posts: state.posts.map(post=>{
                    if(post.id !== action.id)       //if post id is not same as edited one 
                        return post;                //will return post with no change
                    return{
                        id: post.id,                //post id will remain same
                        timestamp: Date.now(),      //timestamp will change according to current time 
                        title: action.title,        //title will change acc to new i/p
                        author: action.author,      //author will change acc to new i/p
                        body: action.body,          //body will change acc to new i/p
                        category: action.category,  //category will change acc to new i/p
                        voteScore: post.voteScore,  //votescore will not change 
                        deleted: false              //post deleted will remain false
                    }
                }),
            }
        case DELETE_POST:   //handle delete post action
            return{
                ...state,
                posts: state.posts.filter(post=>(post.id !== action.id)),   // remove post having id same as action id
                nextPostID: state.nextPostID    //next post id will remain same
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
        default:                            // handling default case
            return state;                   //in default case no changes are needed
        
    }
}


export default postReducer;