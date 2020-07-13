import {
    FETCH_DISPENSER_BEGIN, 
    FETCH_DISPENSER_SUCCESS, 
    FETCH_DISPENSER_FAILURE,
    UPDATE_BUTTON_MEANING_BEGIN,
    UPDATE_BUTTON_MEANING_SUCCESS,
    UPDATE_BUTTON_MEANING_FAILURE 
} from './types'; 

import auth0client from '../auth/Auth';
import { MEDLOCK_API } from '../config/servers';


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
    console.log("fetching dispenser with id: " + id);
    const { getAccessToken } = auth0client;
    const API_URL = MEDLOCK_API;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`};

    return dispatch => {
        dispatch(fetchDispenserBegin());
        return axios.get(`${API_URL}/dispense?id=` + id, { headers })
        .then(res => { 
            console.log(`Dispenser(id=${id}) fetched successfully.`);
            console.log(res.data);
            dispatch(fetchDispenserSuccess(res.data));
        })
        .catch(error => dispatch(fetchDispenserFailure(error)));
    };
}

const updateButtonMeaningBegin = () => ({
    type: UPDATE_BUTTON_MEANING_BEGIN 
});
  
const updateButtonMeaningSuccess = dispenser => ({
    type: UPDATE_BUTTON_MEANING_SUCCESS,
    payload: { dispenser }
});

const updateButtonMeaningFailure = error => ({
    type: UPDATE_BUTTON_MEANING_FAILURE,
    payload: { error }
});

// called on provider's end to update meaning of the buttons
// @param id: the id of the patient's dispenser
export function updateButtonMeaning(id, meanings) {
    const { getAccessToken } = auth0client;
    const API_URL = MEDLOCK_API;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`};

    return dispatch => {
        dispatch(updateButtonMeaningBegin());
        return axios.post(`${API_URL}/dispense/button_meanings`, { id, meanings }, { headers })
        .then(res => { 
            // updated dispenser should be returned
            console.log(res.data);
            dispatch(updateButtonMeaningSuccess(res.data));
        })
        .catch(error => dispatch(updateButtonMeaningFailure(error)));
    };
}
