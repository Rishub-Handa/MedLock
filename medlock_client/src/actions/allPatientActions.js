import { FETCH_ALL_PATIENTS_BEGIN, FETCH_ALL_PATIENTS_SUCCESS, FETCH_ALL_PATIENTS_FAILURE } from './types'; 
import auth0client from '../auth/Auth'; 

const axios = require('axios'); 

// Helper functions give access to the status of the request 
export const fetchAllPatientsBegin = () => ({
    type: FETCH_ALL_PATIENTS_BEGIN
  });
  
export const fetchAllPatientsSuccess = allPatients => ({
    type: FETCH_ALL_PATIENTS_SUCCESS,
    payload: {
        allPatients
    }
  });
  
export const fetchAllPatientsFailure = error => ({
    type: FETCH_ALL_PATIENTS_FAILURE,
    payload: {
        error
    }
  });
  
  // Fetch surveys for a particular user with Access Token 
export function fetchAllPatients() {
    const { getAccessToken } = auth0client;
    const API_URL = 'http://localhost:5000/api';
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`};
    
    return dispatch => {
        dispatch(fetchAllPatientsBegin());
            // Change this URL ??? 
        return axios.get(`${API_URL}/provider/allPatients`, { headers })
            .then(res => {
            console.log(res.data);
            dispatch(fetchAllPatientsSuccess(res.data));
            })
            .catch(error => dispatch(fetchAllPatientsFailure(error)));
    };
  }
