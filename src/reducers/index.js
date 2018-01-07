//importing reducers
import postReducer from './postReducer';
import commentReducer from './commentReducer';

//importing combining function
import { combineReducers } from 'redux';

export default combineReducers({
    postReducer,
    commentReducer
});