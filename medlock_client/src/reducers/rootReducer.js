import { combineReducers } from 'redux';
import profileReducer from './profileReducer'; 
import surveyReducer from './surveyReducer'; 
import dispenseReducer from './dispenseReducer'; 
import authReducer from './authReducer';

export default combineReducers({
    profileState: profileReducer, 
    surveyState: surveyReducer, 
    dispenseState: dispenseReducer,
    authState: authReducer
});