import {
    FETCH_ALL_CLINICS_BEGIN,
    FETCH_ALL_CLINICS_SUCCESS,
    FETCH_ALL_CLINICS_FAILURE,
} from '../actions/types';

const initialState = {
    clinics: [],
    clinicsFetching: false,
    clinicsFetched: false,
    clinicsError: null,
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
        default:
            return state;
    }
}