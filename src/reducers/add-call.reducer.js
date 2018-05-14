import {ADD_CALL, REMOVE_CALL} from '../actions';

const initialState = {
    byId: [],
    byHash: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_CALL:
            return {
                byId: [...state.byId, action.id],
                byHash: {
                    ...state.byHash,
                    [action.id]: action.payload
                }
            };
        case REMOVE_CALL:
            const filteredIds = state.byId.filter(item => item !== action.id);

            state.byHash[action.id] = undefined;

            return {
                byId: filteredIds,
                byHash: JSON.parse(JSON.stringify(state.byHash))
            };
        default:
            return state;
    }
}