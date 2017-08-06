import * as types from '../../../constants/ActionTypes';
import listGems from '../gem.json';

let defaultValue = listGems;

export const gemReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case types.LOAD_GEM_SUCCESS:
            state = action.gems;
            break;
        case types.ADD_GEM:
            const stateCopy = state.slice(0);
            stateCopy.push(action.gem);
            state = stateCopy;
            break;
        default:
            return state;
    }
    return state;
};