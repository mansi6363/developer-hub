//importing action
import {SET_SORT} from '../actions/index'

// initial state
const initialState={
    sort:0      //0 = none || 1= by time || 2= by rating
}

function sortingReducer(state=initialState, action){
    switch(action.type){
        case SET_SORT:
            return{
                ...state,
                sort: action.sort
            }
        default: 
            return state;
    }
}

export default sortingReducer;