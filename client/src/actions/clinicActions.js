import {
    FETCH_ALL_CLINICS_BEGIN,
    FETCH_ALL_CLINICS_SUCCESS,
    FETCH_ALL_CLINICS_FAILURE,
    FETCH_ALL_PROVIDERS_AT_CLINIC_BEGIN,
    FETCH_ALL_PROVIDERS_AT_CLINIC_SUCCESS,
    FETCH_ALL_PROVIDERS_AT_CLINIC_FAILURE
} from './types';

import axios from 'axios';
import auth0client from '../auth/Auth';
import { MEDLOCK_API } from '../config/servers';

const fetchAllClinicsBegin = () => ({
    type: FETCH_ALL_CLINICS_BEGIN
});

const fetchAllClinicsSuccess = clinics => ({
    type: FETCH_ALL_CLINICS_SUCCESS,
    payload: {
        clinics
    }
});

const fetchAllClinicsFailure = error => ({
    type: FETCH_ALL_CLINICS_FAILURE,
    payload: {
        error
    }
});

export function fetchAllClinics() {
    const {
        getAccessToken
    } = auth0client;
    let API_URL = `${MEDLOCK_API}/clinic`;
    const headers = {
        'Authorization': `Bearer ${getAccessToken()}`
    }

    return dispatch => {
        dispatch(fetchAllClinicsBegin());
        return axios.get(API_URL, { headers })
            .then(res => {
                var clinics = res.data;
                console.log(clinics);
                dispatch(fetchAllClinicsSuccess(clinics));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchAllClinicsFailure(error));
            });
    }
}

const fetchAllProvidersAtClinicBegin = () => ({
    type: FETCH_ALL_PROVIDERS_AT_CLINIC_BEGIN
});

const fetchAllProvidersAtClinicSuccess = (providers) => ({
    type: FETCH_ALL_PROVIDERS_AT_CLINIC_SUCCESS,
    payload: {
        providers
    }

});

const fetchAllProvidersAtClinicFailure = (error) => ({
    type: FETCH_ALL_PROVIDERS_AT_CLINIC_FAILURE,
    payload: {
        error
    }
});

export function fetchAllProvidersAtClinic(clinicId) {
    const {
        getAccessToken
    } = auth0client;
    let API_URL = `${MEDLOCK_API}/clinic/providers`;
    const headers = {
        'Authorization': `Bearer ${getAccessToken()}`
    }

    return dispatch => {
        dispatch(fetchAllProvidersAtClinicBegin());
        return axios.post(API_URL, {'_id': clinicId}, { headers })
            .then(res => {
                var providers = res.data;
                console.log(providers);
                dispatch(fetchAllProvidersAtClinicSuccess(providers));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchAllProvidersAtClinicFailure(error));
            });
    }
}