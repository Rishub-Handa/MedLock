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
    DELETE_PROVIDER_BEGIN,
    DELETE_PROVIDER_SUCCESS,
    DELETE_PROVIDER_FAILURE,

} from '../actions/types';

const initialState = {
    provider: null, 
    providers: [],
    providerLoading: false,
    providersFetching: false, 
    providersFetched: false,
    providerDeleting: false,
    deletedProviders: [],
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
        case DELETE_PROVIDER_BEGIN: 
            return {
                ...state,
                providerDeleting: true
            };
        case DELETE_PROVIDER_SUCCESS:
            return {
                ...state,
                providerDeleting: false,
                deletedProviders: action.payload.providers,
                providers: state.providers.filter(provider => provider._id != action.payload.providers[0]._id) // right now delete patient only deletes one patient so this is fine for now

            };
        case DELETE_PROVIDER_FAILURE:
            return {
                ...state, 
                providerDeleting: false,
                providerError: action.payload.error,
            };
        default:
            return state;
    }
}