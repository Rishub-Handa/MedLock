import { 
    CREATE_PATIENT_PROFILE_BEGIN, 
    CREATE_PATIENT_PROFILE_SUCCESS, 
    CREATE_PATIENT_PROFILE_FAILURE, 
    ADD_PATIENT_BEGIN,
    ADD_PATIENT_SUCCESS,
    ADD_PATIENT_FAILURE, 
    FETCH_PATIENTS_BEGIN,
    FETCH_PATIENTS_SUCCESS,
    FETCH_PATIENTS_FAILURE 
} from './types';

import axios from 'axios';
import auth0client from '../auth/Auth';

const createPatientProfileBegin = () => ({
    type: CREATE_PATIENT_PROFILE_BEGIN
});

const createPatientProfileSuccess = patient => ({
    type: CREATE_PATIENT_PROFILE_SUCCESS,
    payload: {
        patient
    }
});

const createPatientProfileFailure = error => ({
    type: CREATE_PATIENT_PROFILE_FAILURE,
    payload: {
        error
    }
}); 


// naming convention ???
export function createPatientProfile(newProfile) {
    const { getAccessToken } = auth0client;
    let API_URL = 'http://localhost:5000/api/provider/patients';
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`};

    return dispatch => {
        dispatch(createPatientProfileBegin());
        return axios.post(API_URL, newProfile, { headers })
            .then(res => dispatch(createPatientProfileSuccess(res.data)))
            .catch(error => dispatch(createPatientProfileFailure(error)));
    }
} 

const addPatientBegin = () => ({
    type: ADD_PATIENT_BEGIN
  });
  
  
const addPatientSuccess = allPatients => ({
  type: ADD_PATIENT_SUCCESS,
  payload: {
    allPatients
  }
});
  
const addPatientFailure = error => ({
    type: ADD_PATIENT_FAILURE,
    payload: {
      error
    }
});

export function addPatientToProviderList(patient) {
  const { getAccessToken } = auth0client;
  const API_URL = 'http://localhost:5000/api/provider/patients';
  const headers = { 'Authorization': `Bearer ${getAccessToken()}`};

  return dispatch => {
    dispatch(addPatientBegin());
    return axios.post(API_URL, patient, { headers })
      .then(res => dispatch(addPatientSuccess(res.data)))
      .catch(error => {
        console.log(error);
        dispatch(addPatientFailure(error));
      });
  }
}
  
  // Helper functions give access to the status of the request 
export const fetchPatientsBegin = () => ({
    type: FETCH_PATIENTS_BEGIN
  });
  
export const fetchPatientsSuccess = patients => ({
    type: FETCH_PATIENTS_SUCCESS,
    payload: {
        patients
    }
  });
  
export const fetchPatientsError = error => ({
    type: FETCH_PATIENTS_FAILURE,
    payload: {
        error
    }
  });
  
// fetches patients for the authenticated provider
export function fetchPatients() {
  const { getAccessToken } = auth0client;
  const API_URL = 'http://localhost:5000/api';
  const headers = { 'Authorization': `Bearer ${getAccessToken()}`};
  
  return dispatch => {
      dispatch(fetchPatientsBegin());
      return axios.get(`${API_URL}/provider/patients`, { headers })
          .then(res => {
            dispatch(fetchPatientsSuccess(res.data));
          })
          .catch(error => dispatch(fetchPatientsError(error)));
  };
}
