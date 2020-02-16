import {
    FETCH_ALL_CLINICS_BEGIN,
    FETCH_ALL_CLINICS_SUCCESS,
    FETCH_ALL_CLINICS_FAILURE,
    FETCH_ALL_PROVIDERS_AT_CLINIC_BEGIN,
    FETCH_ALL_PROVIDERS_AT_CLINIC_SUCCESS,
    FETCH_ALL_PROVIDERS_AT_CLINIC_FAILURE,
    REGISTER_NEW_CLINIC_BEGIN,
    REGISTER_NEW_CLINIC_SUCCESS,
    REGISTER_NEW_CLINIC_FAILURE,
} from '../actions/types';

const initialState = {
    clinics: [],
    clinicsFetching: false,
    clinicsFetched: false,
    clinicsError: null,

    providers: [],
    providersFetching: false,
    providersFetched: false,
    clinicRegistering: false,
    registerError: null,
}

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_CLINICS_BEGIN:
            return {
                ...state,
                clinicsFetching: true
            };
        case FETCH_ALL_CLINICS_SUCCESS:
            return {
                ...state,
                clinicsFetching: false,
                clinicsFetched: true,
                clinics: action.payload.clinics
            }; 
        case FETCH_ALL_CLINICS_FAILURE:
            return {
                ...state,
                clinicsFetching: false,
                clinicsFetched: true,
                clinicsError: action.payload.error
            }
        case FETCH_ALL_PROVIDERS_AT_CLINIC_BEGIN:
            return {
                ...state,
                providersFetching: true,
            };
        case FETCH_ALL_PROVIDERS_AT_CLINIC_SUCCESS:
            return {
                ...state,
                providersFetching: false,
                providersFetched: true,
                providers: action.payload.providers
            };
        case FETCH_ALL_PROVIDERS_AT_CLINIC_FAILURE:
            return {
                ...state,
                providersFetching: false,
                providersFetched: true,
                clinicsError: action.payload.error
            };
        case REGISTER_NEW_CLINIC_BEGIN:
            return {
                ...state,
                clinicRegistering: true,
            };
        case REGISTER_NEW_CLINIC_SUCCESS:
            return {
                ...state,
                clinicRegistering: false,
                clinics: [
                    ...clinics,
                    action.payload.clinic
                ],
            };
        case REGISTER_NEW_CLINIC_FAILURE:
            return {
                ...state,
                clinicRegistering: false,
                registerError: action.payload.error,
            };
        default:
            return state;
    }
}