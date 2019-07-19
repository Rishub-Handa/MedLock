import {
    CREATE_PROVIDER_PROFILE_BEGIN,
    CREATE_PROVIDER_PROFILE_SUCCESS,
    CREATE_PROVIDER_PROFILE_FAILURE,

    FETCH_ALL_PATIENTS_BEGIN,
    FETCH_ALL_PATIENTS_SUCCESS,
    FETCH_ALL_PATIENTS_FAILURE,
    FETCH_ALL_PROVIDERS_BEGIN,
    FETCH_ALL_PROVIDERS_SUCCESS,
    FETCH_ALL_PROVIDERS_FAILURE,

} from '../actions/types';

const initialState = {
    provider: null, 
    providers: [],
    providerLoading: false,
    providersFetching: false, 
    providersFetched: false,
    providerError: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_PROVIDER_PROFILE_BEGIN:
            return {
                ...state,
                providerLoading: true, 
                providerError: null 
            };
        case CREATE_PROVIDER_PROFILE_SUCCESS:
            return {
                ...state,
                providerLoading: false,
                provider: action.payload.provider
            };
        case CREATE_PROVIDER_PROFILE_FAILURE:
            return {
                ...state, 
                providerLoading: false,
                providerError: action.payload.error
            };
        case FETCH_ALL_PROVIDERS_BEGIN: 
            return {
                ...state,
                providersFetching: true,
            };
        case FETCH_ALL_PROVIDERS_SUCCESS: 
            return {
                ...state,
                providersFetching: false,
                providersFetched: true,
                providers: action.payload.providers
            };
        case FETCH_ALL_PROVIDERS_FAILURE:
            return {
                ...state,
                providersFetching: false,
                providersFetched: false,
                providerError: action.payload.error
            };
        default:
            return state;
    }
}