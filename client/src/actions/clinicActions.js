import {
    FETCH_ALL_CLINICS_BEGIN,
    FETCH_ALL_CLINICS_SUCCESS,
    FETCH_ALL_CLINICS_FAILURE,
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
    let API_URL = `${MEDLOCK_API}/clinic/clinic`;
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