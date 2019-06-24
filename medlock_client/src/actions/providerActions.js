import {
    REGISTER_PATIENT_BEGIN,
    REGISTER_PATIENT_SUCCESS,
    REGISTER_PATIENT_FAILURE,
    ASSIGN_PATIENT_ROLE_BEGIN,
    ASSIGN_PATIENT_ROLE_SUCCESS,
    ASSIGN_PATIENT_ROLE_FAILURE
} from './types';

import axios from 'axios';
import auth0client from '../auth/Auth';

const registerPatientBegin = () => ({
    type: REGISTER_PATIENT_BEGIN
});

const registerPatientSuccess = patient => ({
    type: REGISTER_PATIENT_SUCCESS,
    payload: {
        patient
    }
});

const registerPatientFailure = error => ({
    type: REGISTER_PATIENT_FAILURE,
    payload: {
        error
    }

});

export function registerPatient(patient, API_MANAGEMENT_TOKEN) {
    const API_URL = 'https://medlock-dev.auth0.com/api/v2/users';
    const headers = { authorization: `Bearer ${API_MANAGEMENT_TOKEN}`, 'content-type': 'application/json' };

    return dispatch => {
        dispatch(registerPatientBegin());
        return axios.post(API_URL, patient, { headers })
            .then(res => {
                console.log(res.data);
                dispatch(registerPatientSuccess(res.data));
            })
            .catch(error => {
                console.log(error);
                dispatch(registerPatientFailure(error));
                throw error;
            });
    }
}

const assignPatientRoleBegin = () => ({
    type: ASSIGN_PATIENT_ROLE_BEGIN
});

const assignPatientRoleSuccess = patient => ({
    type: ASSIGN_PATIENT_ROLE_SUCCESS,
    payload: {
        patient
    }
});

const assignPatientRoleFailure = error => ({
    type: ASSIGN_PATIENT_ROLE_FAILURE,
    payload: {
        error
    }
});


export function assignPatientRole(patient_id, API_MANAGEMENT_TOKEN) {
    const API_URL = `https://medlock-dev.auth0.com/api/v2/users/${patient_id}/roles`;
    const headers = { authorization: `Bearer ${API_MANAGEMENT_TOKEN}`, 'content-type': 'application/json' };

    const req_body = {
        "roles": [
            "rol_3rJHjXxeLiD1ZJLo"
        ]
    }
    return dispatch => {
        dispatch(assignPatientRoleBegin());
        return axios.post(API_URL, req_body, { headers })
            .then(res => {
                console.log(res.data);
                dispatch(assignPatientRoleSuccess(res.data));
            })
            .catch(error => {
                console.log(error);
                dispatch(assignPatientRoleFailure(error));
            });
    }
}
