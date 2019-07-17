import { 
    CREATE_PATIENT_PROFILE_BEGIN,
    CREATE_PATIENT_PROFILE_SUCCESS,
    CREATE_PATIENT_PROFILE_FAILURE, 
    ADD_PATIENT_BEGIN,
    ADD_PATIENT_SUCCESS,
    ADD_PATIENT_FAILURE, 
    FETCH_PATIENTS_BEGIN, 
    FETCH_PATIENTS_SUCCESS, 
    FETCH_PATIENTS_FAILURE, 
    DELETE_PATIENT_BEGIN,
    DELETE_PATIENT_SUCCESS,
    DELETE_PATIENT_FAILURE
} from '../actions/types'; 

const initialState = {
    patients: [], 
    patient: null, 

    patientsFetching: false, 
    patientsFetched: false,
    fetchPatientsError: null, 

    patientDeleting: false,
    lastPatientDeleted: null,
    deletePatientError: null,

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
                patientsFetching: true, 
                fetchPatientsError: null 
            };
        case FETCH_PATIENTS_SUCCESS: 
            return {
                ...state,
                patientsFetching: false,
                patientsFetched: true,
                patients: action.payload.patients
            };
        case FETCH_PATIENTS_FAILURE:
            return {
                ...state, 
                patientsFetching: false,
                fetchPatientsError: action.payload.error
            };
        case DELETE_PATIENT_BEGIN: 
            return {
                ...state,
                patientDeleting: true,
            };
        case DELETE_PATIENT_SUCCESS:
            return {
                ...state,
                patientDeleting: false,
                lastPatientDeleted: action.payload.patient
            };
        case DELETE_PATIENT_FAILURE:
            return {
                ...state,
                patientDeleting: false,
                deletePatientError: action.payload.error
            };
        default:
            return state;
    }
}



