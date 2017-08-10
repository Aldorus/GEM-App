import {combineReducers} from 'redux';
import {gemReducer} from './modules/gem/reducers/gemReducer';
import {saveReducer} from './modules/save/reducers/saveReducer';
import {userReducer} from './modules/settings/reducers/userReducer';

const rootReducer = combineReducers({
    gemReducer,
    saveReducer,
    userReducer
});

export default rootReducer;
