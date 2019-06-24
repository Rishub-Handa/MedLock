import {
    REGISTER_PATIENT_BEGIN,
    REGISTER_PATIENT_SUCCESS,
    REGISTER_PATIENT_FAILURE,
    ASSIGN_PATIENT_ROLE_BEGIN,
    ASSIGN_PATIENT_ROLE_SUCCESS,
    ASSIGN_PATIENT_ROLE_FAILURE,
} from '../actions/types';

const initialState = {
    patients: [],
    patient: null,
    patientRegistering: false,
    registerError: null,
    roleAssigning: false,
    roleAssignError: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case REGISTER_PATIENT_BEGIN:
            return {
                ...state,
                patientRegistering: true,
            };
        case REGISTER_PATIENT_SUCCESS:
            return {
                ...state,
                patientRegistering: false,
                patient: action.payload.patient
            };
        case REGISTER_PATIENT_FAILURE:
            return {
                ...state,
                patientRegistering: false,
                registerError: action.payload.error
            };
        case ASSIGN_PATIENT_ROLE_BEGIN:
            return {
                ...state,
                roleAssigning: true
            };
        case ASSIGN_PATIENT_ROLE_SUCCESS: 
            return {
                ...state,
                roleAssigning: false,
            };
        case ASSIGN_PATIENT_ROLE_FAILURE: 
            return {
                ...state,
                roleAssigning: false,
                roleAssignError: action.payload.error
            };
        default:
            return state;
    }
}