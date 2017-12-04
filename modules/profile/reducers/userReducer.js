import {AsyncStorage} from 'react-native';
import * as types from '../../../constants/ActionTypes';
import {copyObject} from '../../../utilities/extends/object.utils';

const defaultValue = {};

export const userReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case types.LOAD_USER:
            // action.user.group === 'group_b' ? action.user.displayListWithImage = true : '';
            state = action.user;
            break;
        case types.DISPLAY_LIST_WITH_IMAGE:
            var stateCopy = copyObject(state);
            stateCopy.displayListWithImage = true;
            AsyncStorage.setItem('current_user', JSON.stringify(stateCopy));
            state = stateCopy;
            break;
        case types.DISPLAY_LIST_WITHOUT_IMAGE:
            var stateCopy = copyObject(state);
            stateCopy.displayListWithImage = false;
            AsyncStorage.setItem('current_user', JSON.stringify(stateCopy));
            state = stateCopy;
            break;
        case types.CATEGORY_FILTER:
            var stateCopy = copyObject(state);
            stateCopy.categoryFilter = action.category.label;
            state = stateCopy;
            break;
        case types.RESET_CATEGORY_FILTER:
            var stateCopy = copyObject(state);
            stateCopy.categoryFilter = 'All';
            state = stateCopy;
            break;
        default:
            return state;
    }
    return state;
};