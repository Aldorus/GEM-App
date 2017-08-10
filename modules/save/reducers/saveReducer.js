import * as types from '../../../constants/ActionTypes';
import listSavedGem from '../listSavedGem.json';

let defaultValue = listSavedGem;

export const saveReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case types.LOAD_SAVED_GEM_SUCCESS:
            state = action.savedGems;
            break;
        case types.ADD_SAVED_GEM:
            const stateCopy = state.slice(0);
            stateCopy.unshift(action.savedGem);
            state = stateCopy;
            break;
        default:
            return state;
    }
    return state;
};
