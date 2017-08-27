import {combineReducers} from 'redux';
import {gemReducer} from './modules/gem/reducers/gemReducer';
import {userReducer} from './modules/profile/reducers/userReducer';

const rootReducer = combineReducers({
    gemReducer,
    userReducer
});

export default rootReducer;
