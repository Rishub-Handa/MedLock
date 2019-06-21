import {
    REGISTER_PATIENT_BEGIN,
    REGISTER_PATIENT_SUCCESS,
    REGISTER_PATIENT_FAILURE,
} from './types';

const initialState = {
    patients: [],
    patient: null,
    patientRegistering: false,
    registerError: null
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
        case default:
            return state;
    }
}