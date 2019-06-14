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

export const saveProfile = (newProfile) => dispatch => {
    const { getAccessToken } = auth0client;
    const API_URL = 'http://localhost:5000/api';
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`};

    return dispatch => {
        dispatch(saveProfileBegin());
        return axios.post(`${API_URL}/patient`, newProfile, { headers })
            .then(res => dispatch(saveProfileSuccess(res)))
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

