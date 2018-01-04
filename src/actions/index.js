// ACTIONS RELATED TO POST
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UP_POST_RATE = 'UP_POST_RATE'
export const DOWN_POST_RATE = 'DOWN_POST_RATE'
export const EDIT_POST = 'EDIT_POST'

//ACTION RELATED TO COMMENTS
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UP_COMMENT_RATE = 'UP_COMMENT_RATE'
export const DOWN_COMMENT_RATE = 'DOWN_COMMENT_RATE'
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

export function upPostRate(id){
    return{
        type: UP_POST_RATE,
        id
    }
}

export function downPostRate(id){
    return{
        type: DOWN_POST_RATE,
        id
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

export function upCommentRate(id){
    return{
        type: UP_COMMENT_RATE,
        id
    }
}

export function downCommentRate(id){
    return{
        type: DOWN_COMMENT_RATE,
        id
    }
}