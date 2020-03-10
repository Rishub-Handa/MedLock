import { 
    LOAD_PROFILE_BEGIN,
    LOAD_PROFILE_SUCCESS,
    LOAD_PROFILE_FAILURE,
    SAVE_PROFILE_BEGIN,
    SAVE_PROFILE_SUCCESS, 
    SAVE_PROFILE_FAILURE, 
    EDIT_PROFILE, 
    ADD_PROFILE_MODULE_BEGIN,
    ADD_PROFILE_MODULE_SUCCESS,
    ADD_PROFILE_MODULE_FAILURE,
    ADD_DISPENSER_CODE_BEGIN, 
    ADD_DISPENSER_CODE_SUCCESS, 
    ADD_DISPENSER_CODE_FAILURE,
    UPDATE_MEDICAL_DATA_BEGIN,
    UPDATE_MEDICAL_DATA_SUCCESS,
    UPDATE_MEDICAL_DATA_FAILURE, 
} from './types';

import axios from 'axios';
import auth0client from '../auth/Auth';
import { MEDLOCK_API } from '../config/servers';

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
    let API_URL = MEDLOCK_API;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`};

    switch (role) {
        case "Patient": 
            API_URL += "/patient/patient"; 
            break; 
        case "Provider": 
            API_URL += "/provider/provider"; 
            break; 
    }

    return dispatch => {
        dispatch(loadProfileBegin());
        return axios.get(API_URL, { headers })
            .then(res => {
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
    type: SAVE_PROFILE_FAILURE,
    payload: {
        error
    }
});

export function saveProfile(updatedPersonalData, role) {
    const { getAccessToken } = auth0client;
    let API_URL = MEDLOCK_API;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`};

    switch (role) {
        case "Patient": 
            API_URL += "/patient/patient"; 
            break; 
        case "Provider": 
            API_URL += "/provider/provider"; 
            break; 
    }

    return dispatch => {
        dispatch(saveProfileBegin());
        return axios.put(`${API_URL}`, updatedPersonalData, { headers })
            .then(res => {
                console.log(res.data);
                dispatch(saveProfileSuccess(res.data));
            })
            .catch(error => dispatch(saveProfileFailure(error)));
    }
};

export const editProfile = () => dispatch => {
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
    const { getAccessToken } = auth0client;
    const API_URL = `${MEDLOCK_API}/patient`;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`};

    return dispatch => {
        dispatch(addProfileModuleBegin());
        return axios.post(`${API_URL}/patient/modules`, newProfileModule, { headers })
            .then(res => dispatch(addProfileModuleSuccess(res.data)))
            .catch(error => dispatch(addProfileModuleFailure(error)));
    }
} 


const addDispenserCodeBegin = () => ({
    type: ADD_DISPENSER_CODE_BEGIN
});

const addDispenserCodeSuccess = code => ({
    type: ADD_DISPENSER_CODE_SUCCESS,
    payload: {
        code
    }
});

const addDispenserCodeFailure = error => ({
    type: ADD_DISPENSER_CODE_FAILURE,
    payload: {
        error
    }
}); 

export function addDispenserCode(code) {
    const { getAccessToken } = auth0client;
    const API_URL = `${MEDLOCK_API}/patient`;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`};
    console.log("Code: " + code); 
    return dispatch => {
        dispatch(addDispenserCodeBegin());
        // Make this endpoint
        return axios.post(`${API_URL}/patient/code`, code, { headers })
            .then(res => dispatch(addDispenserCodeSuccess(res.data)))
            .catch(error => dispatch(addDispenserCodeFailure(error)));
    } 
} 

const updateMedicalDataBegin = () => ({
    type: UPDATE_MEDICAL_DATA_BEGIN,
});

const updateMedicalDataSuccess = (user) => ({
    type: UPDATE_MEDICAL_DATA_SUCCESS,
    payload: {
        user
    }
});

const updateMedicalDataFailure = (error) => ({
    type: UPDATE_MEDICAL_DATA_FAILURE,
    payload: {
        error
    }
});

export function updateMedicalData(userId, role, medicalData) {
    console.log("updating medical data");
    console.log(`userId: ${userId}`);
    console.log(`role: ${role}`);
    console.log(`medicalData: ${medicalData}`);
    const { getAccessToken } = auth0client;
    var API_URL = `${MEDLOCK_API}`;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`};

    if (role.toLowerCase() == "patient") {
        API_URL += "/patient/patient"
    } else if (role.toLowerCase() == "provider") {
        API_URL += "/provider/provider"
    }

    console.log(API_URL);

    const body = {
        _id: userId,
        medicalData,
    };

    return dispatch => {
        dispatch(updateMedicalDataBegin());
        return axios.put(`${API_URL}/medicaldata`, body, { headers })
            .then(res => dispatch(updateMedicalDataSuccess(res.data)))
            .catch(error => dispatch(updateMedicalDataFailure(error)));
    };
}
