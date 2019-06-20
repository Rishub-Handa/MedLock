import { 
    CREATE_PROFILE_BEGIN,
    CREATE_PROFILE_SUCCESS,
    CREATE_PROFILE_FAILURE,
    LOAD_PROFILE_BEGIN,
    LOAD_PROFILE_SUCCESS,
    LOAD_PROFILE_FAILURE,
    SAVE_PROFILE_BEGIN,
    SAVE_PROFILE_SUCCESS,
    SUBMIT_SURVEY_FAILURE,
    EDIT_PROFILE, 
    ADD_PROFILE_MODULE_BEGIN,
    ADD_PROFILE_MODULE_SUCCESS,
    ADD_PROFILE_MODULE_FAILURE, 
    FETCH_ROLES_BEGIN, 
    FETCH_ROLES_SUCCESS, 
    FETCH_ROLES_FAILURE, 
    FETCH_AMT_BEGIN, 
    FETCH_AMT_SUCCESS, 
    FETCH_AMT_FAILURE 
} from './types';

import axios from 'axios';
import auth0client from '../auth/Auth';

const createProfileBegin = () => ({
    type: CREATE_PROFILE_BEGIN
});

const createProfileSuccess = profile => ({
    type: CREATE_PROFILE_SUCCESS,
    payload: {
        profile
    }
});

const createProfileFailure = error => ({
    type: CREATE_PROFILE_FAILURE,
    payload: {
        error
    }
});

export function createProfile(newProfile) {
    const { getAccessToken } = auth0client;
    const API_URL = 'http://localhost:5000/api';
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`};

    return dispatch => {
        dispatch(createProfileBegin());
        return axios.post(`${API_URL}/patient`, newProfile, { headers })
            .then(res => dispatch(createProfileSuccess(res.data)))
            .catch(error => dispatch(createProfileFailure(error)));
    }
}

const loadProfileBegin = () => ({
    type: LOAD_PROFILE_BEGIN
});

const loadProfileSuccess = profile => ({
    type: LOAD_PROFILE_SUCCESS,
    payload: {
        profile
    } 
});

const loadProfileFailure = error => ({
    type: LOAD_PROFILE_FAILURE,
    payload: {
        error
    }
});

export function loadProfile() {
    const { getAccessToken } = auth0client;
    const API_URL = 'http://localhost:5000/api';
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`};

    return dispatch => {
        dispatch(loadProfileBegin());
        return axios.get(`${API_URL}/patient`, { headers })
            .then(res => dispatch(loadProfileSuccess(res.data)))
            .catch(error => dispatch(loadProfileFailure(error)));
    }
}

export const saveProfileBegin = () => ({
    type: SAVE_PROFILE_BEGIN
});

const saveProfileSuccess = newProfile => ({
    type: SAVE_PROFILE_SUCCESS,
    payload: {
        newProfile
    }
});

const saveProfileFailure = error => ({
    type: SUBMIT_SURVEY_FAILURE,
    payload: {
        error
    }
});

export function saveProfile(newProfile) {
    console.log("Save Profile Running...");
    const { getAccessToken } = auth0client;
    const API_URL = 'http://localhost:5000/api';
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`};

    return dispatch => {
        dispatch(saveProfileBegin());
        return axios.put(`${API_URL}/patient`, newProfile, { headers })
            .then(res => dispatch(saveProfileSuccess(res.data)))
            .catch(error => dispatch(saveProfileFailure(error)));
    }
};

export const editProfile = () => dispatch => {
    console.log(EDIT_PROFILE);
    const action = {
        type: EDIT_PROFILE
    }
    dispatch(action);
};

const addProfileModuleBegin = () => ({
    type: ADD_PROFILE_MODULE_BEGIN
});

const addProfileModuleSuccess = newProfileModule => ({
    type: ADD_PROFILE_MODULE_SUCCESS,
    payload: {
        newProfileModule
    }
});

const addProfileModuleFailure = error => ({
    type: ADD_PROFILE_MODULE_FAILURE,
    payload: {
        error
    }
});

export function addProfileModule(newProfileModule) {
    console.log("addProfileModule");
    const { getAccessToken } = auth0client;
    const API_URL = 'http://localhost:5000/api';
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`};

    return dispatch => {
        dispatch(addProfileModuleBegin());
        return axios.post(`${API_URL}/patient/modules`, newProfileModule, { headers })
            .then(res => dispatch(addProfileModuleSuccess(res.data)))
            .catch(error => dispatch(addProfileModuleFailure(error)));
    }
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
