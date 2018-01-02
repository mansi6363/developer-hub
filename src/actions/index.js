// ACTIONS RELATED TO POST
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST_RATE = 'UPDATE_POST_RATE'
export const EDIT_POST = 'EDIT_POST'

//ACTION RELATED TO COMMENTS
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPDATE_COMMENT_RATE = 'UPDATE_COMMENT_RATE'
export const EDIT_COMMENT = 'EDIT_COMMENT'

//POST ACTION CREATERS
export function addPost(title, body, author, category){
    return{
        type: ADD_POST,
        title,
        body,
        author,
        category
    }
}

export function editPost(id, title, body, author, category){
    return{
        type: EDIT_POST,
        id,
        title,
        body,
        author,
        category
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
export function addComment(parentID, body, author){
    return{
        type: ADD_COMMENT,
        body,
        author,
        parentID
    }
}

export function editComment(id, body, author){
    return{
        type: EDIT_COMMENT,
        id,
        body,
        author
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