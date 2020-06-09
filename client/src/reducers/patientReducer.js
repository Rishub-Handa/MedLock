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
    DELETE_PATIENT_FAILURE,

    FETCH_ALL_PATIENTS_BEGIN,
    FETCH_ALL_PATIENTS_SUCCESS,
    FETCH_ALL_PATIENTS_FAILURE,

    REMOVE_PATIENT_BEGIN,
    REMOVE_PATIENT_SUCCESS, 
    REMOVE_PATIENT_FAILURE,

    ADD_CHECKIN_BEGIN, 
    ADD_CHECKIN_SUCCESS, 
    ADD_CHECKIN_FAILURE 

} from '../actions/types'; 

const initialState = {
    patients: [], 
    patient: null, 

    patientsFetching: false, 
    patientsFetched: false,
    fetchPatientsError: null, 

    patientDeleting: false,
    deletedPatients: null,
    deletePatientError: null,

    patientRegistering: false, 
    createPatientError: null, 
    newAddedPatient: null, 
    addPatientLoading: false, 
    addPatientError: null, 

    patientRemoving: false,
    lastRemovedPatient: null,
    patientRemoveError: null, 

    checkInData: null, 
    checkInLoading: false, 
    checkInError: null 
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
                // patients: [...action.payload.patient],
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
            var updatedPatients = state.patients.filter(patient => {
                console.log(patient._id);
                return patient._id != action.payload.patients[0]._id;
            });
            return {
                ...state,
                patientDeleting: false,
                deletedPatients: action.payload.patients,
                patients: updatedPatients,
            };
        case DELETE_PATIENT_FAILURE:
            return {
                ...state,
                patientDeleting: false,
                deletePatientError: action.payload.error
            };
        case FETCH_ALL_PATIENTS_BEGIN:
            return {
                ...state,
                patientsFetching: true,
            };
        case FETCH_ALL_PATIENTS_SUCCESS:
            return {
                ...state,
                patientsFetching: false,
                patientsFetched: true,
                patients: action.payload.patients
            };
        case FETCH_ALL_PATIENTS_FAILURE:
            return {
                ...state,
                patientsFetching: false,
                patientsFetched: false,
                patients: action.payload.error
            };
        case REMOVE_PATIENT_BEGIN: 
            return {
                ...state,
                patientRemoving: true,
            };
        case REMOVE_PATIENT_SUCCESS:
            return {
                ...state,
                patientRemoving: false,
                lastRemovedPatient: action.payload.patient
            };
        case REMOVE_PATIENT_FAILURE: 
            return {
                ...state,
                patientRemoving: false,
                patientRemoveError: action.payload.error
            };
        case ADD_CHECKIN_BEGIN: 
            return {
                ...state,
                checkInLoading: true,
                checkInError: null
            };
        case ADD_CHECKIN_SUCCESS:
            return {
                ...state,
                checkInLoading: false,
                checkInData: action.payload.checkIn
            };
        case ADD_CHECKIN_FAILURE:
            return {
                ...state,
                checkInLoading: false,
                checkInError: action.payload.error
            }
        default:
            return state;
    }
}



