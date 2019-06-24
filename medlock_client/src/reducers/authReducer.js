import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    FETCH_ROLES_BEGIN, 
    FETCH_ROLES_SUCCESS, 
    FETCH_ROLES_FAILURE, 
    FETCH_AMT_BEGIN, 
    FETCH_AMT_SUCCESS, 
    FETCH_AMT_FAILURE 
} from '../actions/types';

const initialState = {
    roles: null, 
    rolesLoading: false, 
    rolesError: null, 
    AMT: null, 
    AMTLoading: false, 
    AMTError: null
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
        case FETCH_AMT_BEGIN: 
            return {
                ...state, 
                AMTLoading: true, 
                AMTError: null 
            };
        case FETCH_AMT_SUCCESS: 
            return {
                ...state, 
                AMTLoading: false, 
                AMT: action.payload.AMT 
            };
        case FETCH_AMT_FAILURE: 
            return {
                ...state, 
                AMTLoading: false, 
                AMTError: action.payload.error 
            };
        default:
            return state;
    }
}