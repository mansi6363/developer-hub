//importing reducers
import postReducer from './postReducer';
import commentReducer from './commentReducer';
import categoryReducer from './categoryReducer';
import sortingReducer from './sortingReducer';

//importing combining function
import { combineReducers } from 'redux';

export default combineReducers({
    postReducer,
    commentReducer, 
    categoryReducer,
    sortingReducer
});