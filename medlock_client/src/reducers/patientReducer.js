import { 
    CREATE_PATIENT_PROFILE_BEGIN,
    CREATE_PATIENT_PROFILE_SUCCESS,
    CREATE_PATIENT_PROFILE_FAILURE, 
    ADD_PATIENT_BEGIN,
    ADD_PATIENT_SUCCESS,
    ADD_PATIENT_FAILURE, 
    FETCH_PATIENTS_BEGIN, 
    FETCH_PATIENTS_SUCCESS, 
    FETCH_PATIENTS_FAILURE 
} from '../actions/types'; 

const initialState = {
    patients: [], 
    patientsLoading: false, 
    fetchPatientsError: null, 
    patient: null, 
    patientRegistering: false, 
    createPatientError: null, 
    newAddedPatient: null, 
    addPatientLoading: false, 
    addPatientError: null, 
} 

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_PATIENT_PROFILE_BEGIN:
            return {
                ...state,
                patientRegistering: true, 
                createPatientError: null 
            };
        case CREATE_PATIENT_PROFILE_SUCCESS:
            return {
                ...state,
                patientRegistering: false,
                patient: action.payload.patient
            };
        case CREATE_PATIENT_PROFILE_FAILURE:
            return {
                ...state, 
                patientRegistering: false,
                createPatientError: action.payload.error
            };
        case ADD_PATIENT_BEGIN:
            return {
                ...state,
                addPatientLoading: true, 
                addPatientError: null 
            };
        case ADD_PATIENT_SUCCESS:
            return {
                ...state,
                addPatientLoading: false,
                newAddedPatient: action.payload.patient
            };
        case ADD_PATIENT_FAILURE:
            return {
                ...state, 
                addPatientLoading: false,
                addPatientError: action.payload.error
            };
        case FETCH_PATIENTS_BEGIN:
            return {
                ...state,
                patientsLoading: true, 
                fetchPatientsError: null 
            };
        case FETCH_PATIENTS_SUCCESS: 
            return {
                ...state,
                patientsLoading: false,
                patients: action.payload.patients
            };
        case FETCH_PATIENTS_FAILURE:
            return {
                ...state, 
                patientsLoading: false,
                fetchPatientsError: action.payload.error
            };
        default:
            return state;
    }
}



