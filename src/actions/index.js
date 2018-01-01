// ACTIONS RELATED TO POST
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST_RATE = 'UPDATE_POST_RATE'

//ACTION RELATED TO COMMENTS
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPDATE_COMMENT_RATE = 'UPDATE_COMMENT_RATE'

//POST ACTION CREATERS
export function addPost(id, timestamp=Date.now(), title, body, author, category, voteScore){
    return{
        type: ADD_POST,
        timestamp,
        title,
        body,
        author,
        category,
        voteScore,
        deleted: false
    }
}

export function deletePost(id){
    return{
        type: DELETE_POST,
        id
    }
}

export function updatePostRate(id, rate){
    return{
        type: UPDATE_POST_RATE,
        id,
        rate
    }
}

//COMMENT ACTION CREATERS
export function addComment(id,parentID ,timestamp=Date.now(), body, author, voteScore){
    return{
        type: ADD_COMMENT,
        timestamp,
        title,
        body,
        author,
        category,
        voteScore,
        deleted: false
    }
}

export function deleteComment(id){
    return{
        type: DELETE_COMMENT,
        id
    }
}

export function updateCommentRate(id, rate){
    return{
        type: UPDATE_COMMENT_RATE,
        id,
        rate
    }
}