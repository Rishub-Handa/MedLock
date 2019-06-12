import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './types';

const loginRequest = (creds) => ({
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
});

const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
    
});

const loginFailure = error => ({
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    error
});

export function loginUser(creds) {
    let config = {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlendcoded' },
        body: `username=${creds.username}&password=${creds.password}`
    }
    return dispatch => {
        dispatch(loginRequest(creds));
        
    }
}