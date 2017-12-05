import * as types from '../../../constants/ActionTypes';
import {copyArray} from '../../../utilities/extends/object.utils';

const defaultValue = [];

export const commentReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case types.LOAD_COMMENT_SUCCESS:
            state = copyArray(action.comments);
            break;
        case types.ADD_COMMENT:
            const stateCopy = copyArray(state);
            stateCopy.unshift(action.comment);
            state = stateCopy;
            break;
        default:
            return state;
    }
    return state;
};
