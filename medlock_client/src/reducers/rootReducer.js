import { combineReducers } from 'redux';
import profileReducer from './profileReducer';


export default combineReducers({
    profileState: profileReducer
});