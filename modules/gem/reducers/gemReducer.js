import * as types from '../../../constants/ActionTypes';

const defaultValue = [];

export const gemReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case types.LOAD_GEM_SUCCESS:
            state = action.gems;
            break;
        case types.ADD_GEM:
            const stateCopy = state.slice(0);
            stateCopy.unshift(action.gem);
            state = stateCopy;
            break;
        case types.DELETE_GEM:
            state = state.slice(0).filter((gem) => {
                return gem.id !== action.gem.id;
            });
            break;
        default:
            return state;
    }
    return state;
};
