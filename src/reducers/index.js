import { combineReducers } from 'redux';
import AddCallReducer from './add-call.reducer';
import RemoveCallReducer from './remove-call.reducer';


const appReducer = combineReducers({
    calls: AddCallReducer
});

export default appReducer;
