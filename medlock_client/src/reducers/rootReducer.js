import { combineReducers } from 'redux';
import profileReducer from './profileReducer'; 
import surveyReducer from './surveyReducer'; 
import dispenseReducer from './dispenseReducer'; 


export default combineReducers({
    profileState: profileReducer, 
    surveyState: surveyReducer, 
    dispenseState: dispenseReducer 
});