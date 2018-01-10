//importing reducers
import postReducer from './postReducer';
import commentReducer from './commentReducer';
import categoryReducer from './categoryReducer';

//importing combining function
import { combineReducers } from 'redux';

export default combineReducers({
    postReducer,
    commentReducer, 
    categoryReducer
});