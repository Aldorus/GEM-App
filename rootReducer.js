import {combineReducers} from 'redux';
import {gemReducer} from './modules/gem/reducers/gemReducer';
import {savedReducer} from './modules/save/reducers/savedReducer';
import {userReducer} from './modules/profile/reducers/userReducer';

const rootReducer = combineReducers({
    gemReducer,
    savedReducer,
    userReducer
});

export default rootReducer;
