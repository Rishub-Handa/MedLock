import {
    FETCH_DISPENSES_BEGIN, 
    FETCH_DISPENSES_SUCCESS, 
    FETCH_DISPENSES_FAILURE 
} from './types'; 

import auth0client from '../auth/Auth';

const axios = require('axios'); 

export const fetchDispensesBegin = () => ({
    type: FETCH_DISPENSES_BEGIN 
});
  
export const fetchDispensesSuccess = dispenses => ({
    type: FETCH_DISPENSES_SUCCESS,
    payload: { dispenses }
});

export const fetchDispensesFailure = error => ({
    type: FETCH_DISPENSES_FAILURE,
    payload: { error }
});

export function fetchDispenses(id) {
    const { getAccessToken } = auth0client;
    const API_URL = 'http://localhost:5000/api';
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`};

    return dispatch => {
        dispatch(fetchDispensesBegin());
        return axios.get(`${API_URL}/dispense?id=` + id, { headers })
        .then(res => { 
            dispatch(fetchDispensesSuccess(res.data));
        })
        .catch(error => dispatch(fetchDispensesFailure(error)));
    };
}
