import {combineReducers} from 'redux';
import {gemReducer} from './modules/gem/reducers/gemReducer';
import {savedReducer} from './modules/save/reducers/savedReducer';
import {userReducer} from './modules/profile/reducers/userReducer';
import {commentReducer} from './modules/gem/reducers/commentReducer';

const rootReducer = combineReducers({
    gemReducer,
    savedReducer,
    userReducer,
    commentReducer
});

export default rootReducer;
