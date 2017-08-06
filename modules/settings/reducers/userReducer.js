import * as types from "../../../constants/ActionTypes";
import {copyObject} from '../../../utilities/object.utils';
let defaultValue = {};

export const userReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case types.LOAD_USER:
            state = action.user;
            break;
        case types.DISPLAY_LIST_WITH_IMAGE:
            var stateCopy = copyObject(state);
            stateCopy.displayListWithImage = true;
            state = stateCopy;
            break;
        case types.DISPLAY_LIST_WITHOUT_IMAGE:
            var stateCopy = copyObject(state);
            stateCopy.displayListWithImage = false;
            state = stateCopy;
            break;
        default:
            return state;
    }
    return state;
};