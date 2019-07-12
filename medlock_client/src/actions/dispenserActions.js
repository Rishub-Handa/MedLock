import {
    FETCH_DISPENSER_BEGIN, 
    FETCH_DISPENSER_SUCCESS, 
    FETCH_DISPENSER_FAILURE 
} from './types'; 

import auth0client from '../auth/Auth';

const axios = require('axios'); 

// Helper functions give access to the status of the request 
const fetchDispenserBegin = () => ({
    type: FETCH_DISPENSER_BEGIN 
});
  
const fetchDispenserSuccess = dispenser => ({
    type: FETCH_DISPENSER_SUCCESS,
    payload: { dispenser }
});

const fetchDispenserFailure = error => ({
    type: FETCH_DISPENSER_FAILURE,
    payload: { error }
});

// Fetch Dispenses Data from Server 
export function fetchDispenser(id) {
    const { getAccessToken } = auth0client;
    const API_URL = 'http://localhost:5000/api';
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`};

    return dispatch => {
        dispatch(fetchDispenserBegin());
        return axios.get(`${API_URL}/dispense?id=` + id, { headers })
        .then(res => { 
            dispatch(fetchDispenserSuccess(res.data));
        })
        .catch(error => dispatch(fetchDispenserFailure(error)));
    };
}
