import { 
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
} from './types';

import axios from 'axios';
import auth0client from '../auth/Auth';

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

export function loadProfile(role) {
    const { getAccessToken } = auth0client;
    let API_URL = 'http://localhost:5000/api';
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`};

    switch (role) {
        case "Patient": 
            API_URL += "/patient"; 
            break; 
        case "Provider": 
            API_URL += "/provider"; 
            break; 
    }

    return dispatch => {
        dispatch(loadProfileBegin());
        return axios.get(API_URL, { headers })
            .then(res => {
                console.log(res); 
                dispatch(loadProfileSuccess(res.data)); 
            })
            .catch(error => dispatch(loadProfileFailure(error)));
    }
}

const saveProfileBegin = () => ({
    type: SAVE_PROFILE_BEGIN
});

const saveProfileSuccess = updatedPersonalData => ({
    type: SAVE_PROFILE_SUCCESS,
    payload: {
        updatedPersonalData
    }
});

const saveProfileFailure = error => ({
    type: SUBMIT_SURVEY_FAILURE,
    payload: {
        error
    }
});

export function saveProfile(updatedPersonalData) {
    console.log("Save Profile Running...");
    console.log(updatedPersonalData);
    const { getAccessToken } = auth0client;
    const API_URL = 'http://localhost:5000/api';
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`};

    return dispatch => {
        dispatch(saveProfileBegin());
        return axios.put(`${API_URL}/patient`, updatedPersonalData, { headers })
            .then(res => {
                console.log(res.data);
                dispatch(saveProfileSuccess(res.data))
            })
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