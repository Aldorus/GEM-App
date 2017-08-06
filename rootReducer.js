import {combineReducers} from 'redux';
import {gemReducer} from './modules/gem/reducers/gemReducer';
import {userReducer} from './modules/settings/reducers/userReducer';

const rootReducer = combineReducers({
    gemReducer,
    userReducer
});

export default rootReducer;