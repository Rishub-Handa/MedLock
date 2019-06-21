import { 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    FETCH_AMT_BEGIN, 
    FETCH_AMT_SUCCESS, 
    FETCH_AMT_FAILURE,
    FETCH_ROLES_BEGIN, 
    FETCH_ROLES_SUCCESS, 
    FETCH_ROLES_FAILURE,
 } from './types';

import axios from 'axios';
import auth0client from '../auth/Auth';

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

}

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
  
  // Fetch surveys for a particular user with Access Token 
export function fetchRoles(API_MANAGEMENT_TOKEN) {
    const user_id = auth0client.userProfile.sub; 

    const API_URL = `https://medlock-dev.auth0.com/api/v2/users/${user_id}/roles`;
    const headers = { authorization: `Bearer ${API_MANAGEMENT_TOKEN}`};
    
    return dispatch => {
      dispatch(fetchRolesBegin());
      return axios.get(API_URL, { headers })
        .then(res => {
          console.log(res.data);
          dispatch(fetchRolesSuccess(res.data));
        })
        .catch(error => dispatch(fetchRolesFailure(error)));
    };
} 

export const fetchAMTBegin = () => ({
    type: FETCH_AMT_BEGIN
});
  
export const fetchAMTSuccess = AMT => ({
    type: FETCH_AMT_SUCCESS,
    payload: {
        AMT
    }
});

export const fetchAMTFailure = error => ({
    type: FETCH_AMT_FAILURE,
    payload: {
        error
    }
});

export function fetchAMT() {
    const AMTHeaders = { 'Content-Type': 'application/json' }; 
    const AMTBody = {"client_id":"Wf9NsAneKffcZ8y24IhMzjZ4C3JvIken","client_secret":"sPFQ_UQ1G5e20F87cc2MDU-BDjzG1i9CHEnOISfnuHSgyYGvI_zhXQR5nsZto-tA","audience":"https://medlock-dev.auth0.com/api/v2/","grant_type":"client_credentials"}; 
    const API_URL = `https://medlock-dev.auth0.com/oauth/token`;
    
    return dispatch => {
        dispatch(fetchAMTBegin());
        return axios.post(API_URL, AMTBody, AMTHeaders)
        .then(res => {
            console.log(res.data);
            dispatch(fetchAMTSuccess(res.data));
        })
        .catch(error => dispatch(fetchAMTFailure(error)));
    };
}
