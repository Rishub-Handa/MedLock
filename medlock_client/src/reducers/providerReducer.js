import {
    CREATE_PROVIDER_PROFILE_BEGIN,
    CREATE_PROVIDER_PROFILE_SUCCESS,
    CREATE_PROVIDER_PROFILE_FAILURE 
} from '../actions/types';

const initialState = {
    provider: null, 
    providerLoading: false, 
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
        default:
            return state;
    }
}