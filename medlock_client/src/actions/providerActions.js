import {
    REGISTER_PATIENT_BEGIN,
    REGISTER_PATIENT_SUCCESS,
    REGISTER_PATIENT_FAILURE,
} from './types';

import axios from 'axios';
import auth0client from '../auth/Auth';

const registerPatientBegin = () => ({
    type: REGISTER_PATIENT_BEGIN
});

const registerPatientSuccess = () => ({
    type: REGISTER_PATIENT_SUCCESS,
});

const registerPatientFailure = () => ({
    type: REGISTER_PATIENT_FAILURE,

});

export function registerPatient(patient, AMT) {
    const API_URL = 'https://medlock-dev.auth0.com/api/v2/users';
    const headers = { authorization: `Bearer ${AMT}`, 'Content-Type': 'application/json' };

    axios.post(API_URL, patient, { headers })


}