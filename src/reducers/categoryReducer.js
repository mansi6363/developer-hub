//importing action
import {SET_ACTIVE_CATEGORY, ADD_CATEGORIES} from '../actions/index'

//initial state
const initialState = {
    categories: [],
    activeCategory: null
}

//reducer
function categoryReducer(state=initialState, action){
    switch(action){
        case SET_ACTIVE_CATEGORY:
            return{
                activeCategory: action.category
            }
        case ADD_CATEGORIES:
            return{
                categories: action.categories
            }
        default:
            return state
    }
}
