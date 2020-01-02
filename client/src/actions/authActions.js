import { 
    FETCH_ROLES_BEGIN, 
    FETCH_ROLES_SUCCESS, 
    FETCH_ROLES_FAILURE, 
    AUTH0_REGISTRATION_BEGIN, 
    AUTH0_REGISTRATION_SUCCESS, 
    AUTH0_REGISTRATION_FAILURE, 
    ASSIGN_ROLES_BEGIN, 
    ASSIGN_ROLES_SUCCESS, 
    ASSIGN_ROLES_FAILURE 
 } from './types';

import axios from 'axios';
import auth0client from '../auth/Auth';
import { MEDLOCK_URL } from '../config/servers';

export const fetchRolesBegin = () => ({
    type: FETCH_ROLES_BEGIN
});
  
export const fetchRolesSuccess = roles => ({
    type: FETCH_ROLES_SUCCESS,
    payload: {
        roles
    }
});

export const fetchRolesFailure =error => ({
    type: FETCH_ROLES_FAILURE,
    payload: {
        error
    }
});
  
export function fetchRoles(API_MANAGEMENT_TOKEN) {
    console.log("action initiated: fetchRoles");
    const user_id = auth0client.userProfile.sub; 

    const API_URL = `https://medlock-dev.auth0.com/api/v2/users/${user_id}/roles`;
    const headers = { 
        authorization: `Bearer ${API_MANAGEMENT_TOKEN}`,
        'Access-Control-Allow-Origin': MEDLOCK_URL,
    };
    
    return dispatch => {
      dispatch(fetchRolesBegin());
      return axios.get(API_URL, { headers })
        .then(res => {
          dispatch(fetchRolesSuccess(res.data));
        })
        .catch(error => {
            dispatch(fetchRolesFailure(error))
        });
    };
} 

const auth0RegistrationBegin = () => ({
    type: AUTH0_REGISTRATION_BEGIN
});

const auth0RegistrationSuccess = userProfile => ({
    type: AUTH0_REGISTRATION_SUCCESS,
    payload: {
        userProfile
    }
});

const auth0RegistrationFailure = error => ({
    type: AUTH0_REGISTRATION_FAILURE,
    payload: {
        error
    }

});

export function auth0Registration(newUser, API_MANAGEMENT_TOKEN) {
    const API_URL = 'https://medlock-dev.auth0.com/api/v2/users';
    const headers = { authorization: `Bearer ${API_MANAGEMENT_TOKEN}`, 
                    'content-type': 'application/json' };

    return dispatch => {
        dispatch(auth0RegistrationBegin());
        return axios.post(API_URL, newUser, { headers })
            .then(res => {
                dispatch(auth0RegistrationSuccess(res.data));
            })
            .catch(error => {
                console.log(`auth0registration: ${error}`);
                dispatch(auth0RegistrationFailure(error));
                throw error;
            });
    }
}

const assignRolesBegin = () => ({
    type: ASSIGN_ROLES_BEGIN
});

const assignRolesSuccess = role => ({
    type: ASSIGN_ROLES_SUCCESS,
    payload: {
        role
    }
});

const assignRolesFailure = error => ({
    type: ASSIGN_ROLES_FAILURE,
    payload: {
        error
    }
});


export function assignRoles(user_id, API_MANAGEMENT_TOKEN, role) {
    const API_URL = `https://medlock-dev.auth0.com/api/v2/users/${user_id}/roles`;
    const headers = { authorization: `Bearer ${API_MANAGEMENT_TOKEN}`, 
                    'Content-Type': 'application/json' };

    let req_body = {}; 

    switch(role) {
        case "Patient": 
            req_body = {
                "roles": [
                    "rol_3rJHjXxeLiD1ZJLo" 
                ]
            }
            break; 
        case "Provider": 
            req_body = {
                "roles": [
                    "rol_eXgwl6628aJ35Cq4" 
                ]
            }
            break; 
        default: 
    } 

    return dispatch => {
        dispatch(assignRolesBegin());
        return axios.post(API_URL, req_body, { headers })
            .then(res => {
                dispatch(assignRolesSuccess(res.data));
            })
            .catch(error => {
                console.log(error);
                dispatch(assignRolesFailure(error));
            });
    }
}

