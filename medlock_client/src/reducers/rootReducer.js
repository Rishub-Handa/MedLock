import { combineReducers } from 'redux';
import profileReducer from './profileReducer'; 
import surveyReducer from './surveyReducer'; 


export default combineReducers({
    profileState: profileReducer, 
    surveyState: surveyReducer
});