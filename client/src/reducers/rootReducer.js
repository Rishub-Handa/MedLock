import { combineReducers } from 'redux';
import profileReducer from './profileReducer'; 
import surveyReducer from './surveyReducer'; 
import dispenseReducer from './dispenseReducer'; 
import authReducer from './authReducer';
import providerReducer from './providerReducer'; 
import patientReducer from './patientReducer'; 
import sideBarReducer from './sideBarReducer';
import clinicReducer from './clinicReducer';
import documentReducer from './documentReducer';

export default combineReducers({
    profileState: profileReducer, 
    surveyState: surveyReducer, 
    dispenseState: dispenseReducer,
    authState: authReducer,
    providerState: providerReducer, 
    patientState: patientReducer,
    sideBarState: sideBarReducer,
    clinicState: clinicReducer,
    documentState: documentReducer,
});