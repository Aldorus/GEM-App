import * as types from '../../../constants/ActionTypes';

const defaultValue = [];

export const savedReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case types.LOAD_SAVED_GEM_SUCCESS:
            state = action.saved;
            break;
        case types.ADD_SAVED_GEM:
            const stateCopy = state.slice(0);
            stateCopy.unshift(action.saved);
            state = stateCopy;
            break;
        default:
            return state;
    }
    return state;
};