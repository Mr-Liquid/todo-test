import { REMOVE_CALL } from '../actions';


const initialState = {
    byId: [],
    byHash: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case REMOVE_CALL:
            const filteredIds = state.byId.filter(item => item.id !== action.id);

            state.byHash[action.id] = undefined;

            return {
                byId: filteredIds,
                byHash: JSON.parse(JSON.stringify(state.byHash))
            };

        default:
            return state;
    }
}