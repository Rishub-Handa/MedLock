import {
    FETCH_ROLES_BEGIN, 
    FETCH_ROLES_SUCCESS, 
    FETCH_ROLES_FAILURE, 
    AUTH0_REGISTRATION_BEGIN, 
    AUTH0_REGISTRATION_SUCCESS, 
    AUTH0_REGISTRATION_FAILURE,
    VALIDATE_REGISTER_CODE_BEGIN,
    VALIDATE_REGISTER_CODE_SUCCESS,
    VALIDATE_REGISTER_CODE_FAILURE, 
    FETCH_USER_DATA_BEGIN,
    FETCH_USER_DATA_SUCCESS,
    FETCH_USER_DATA_FAILURE,
} from '../actions/types';

const initialState = {
    roles: null, 
    rolesLoading: false, 
    rolesError: null, 
    AMT: null, 
    AMTLoading: false, 
    AMTError: null, 
    userProfile: null,
    userData: null, 
    userProfileLoading: false, 
    userProfileError: null,
    registerCodeValidating: false,
    registerCodeValidated: false,
    userDataLoading: false,
    userDataError: false,
}

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_ROLES_BEGIN: 
            return {
                ...state, 
                rolesLoading: true, 
                rolesError: null 
            };
        case FETCH_ROLES_SUCCESS: 
            return {
                ...state, 
                rolesLoading: false, 
                roles: action.payload.roles 
            };
        case FETCH_ROLES_FAILURE: 
            return {
                ...state, 
                rolesLoading: false, 
                rolesError: action.payload.error, 
                roles: {} 
            }; 
        case AUTH0_REGISTRATION_BEGIN: 
            return {
                ...state, 
                userProfileLoading: true, 
                userProfileError: null 
            }; 
        case AUTH0_REGISTRATION_SUCCESS: 
            return {
                ...state, 
                userProfileLoading: false, 
                userProfile: action.payload.userProfile 
            };
        case AUTH0_REGISTRATION_FAILURE: 
            return {
                ...state, 
                userProfileLoading: false, 
                userProfileError: action.payload.error 
            }; 
        case VALIDATE_REGISTER_CODE_BEGIN:
            return {
                ...state, 
                registerCodeValidating: true,
            };
        case VALIDATE_REGISTER_CODE_SUCCESS:
            return {
                ...state,
                registerCodeValidating: false,
                registerCodeValidated: true,
            };
        case VALIDATE_REGISTER_CODE_FAILURE:
            return {
                ...state,
                registerCodeValidating: false,
                registerCodeValidated: false,
            };
        case FETCH_USER_DATA_BEGIN:
            return {
                ...state,
                userDataLoading: true,
            };
        case FETCH_USER_DATA_SUCCESS:
            return {
                ...state, 
                userData: action.payload.userData,
                userDataLoading: false,
            };
        case FETCH_USER_DATA_FAILURE:
            return {
                ...state,
                userDataError: action.payload.error,
                userDataLoading: false,
            };
        default:
            return state;
    }
}