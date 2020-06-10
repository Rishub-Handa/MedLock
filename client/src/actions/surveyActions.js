import {
  SUBMIT_PDISURVEY_BEGIN,
  SUBMIT_PDISURVEY_SUCCESS,
  SUBMIT_PDISURVEY_FAILURE,
  FETCH_PDISURVEYS_BEGIN,
  FETCH_PDISURVEYS_SUCCESS,
  FETCH_PDISURVEYS_FAILURE, 
  SUBMIT_INTAKESURVEY_BEGIN, 
  SUBMIT_INTAKESURVEY_SUCCESS, 
  SUBMIT_INTAKESURVEY_FAILURE, 
  SUBMIT_EXITSURVEY_BEGIN, 
  SUBMIT_EXITSURVEY_SUCCESS, 
  SUBMIT_EXITSURVEY_FAILURE
} from './types';
import auth0client from '../auth/Auth';
import { MEDLOCK_API } from '../config/servers';

const axios = require('axios');

// Helper functions give access to the status of the request 
export const submitPDISurveyBegin = () => ({
  type: SUBMIT_PDISURVEY_BEGIN
});

export const submitPDISurveySuccess = survey => ({
  type: SUBMIT_PDISURVEY_SUCCESS,
  payload: {
    survey
  }
});

export const submitPDISurveyFailure = error => ({
  type: SUBMIT_PDISURVEY_FAILURE,
  payload: {
    error
  }
});

// Submit a survey to the server 
export function submitPDISurvey(survey) {
  const { getAccessToken } = auth0client;
  const API_URL = MEDLOCK_API;
  const headers = { 'Authorization': `Bearer ${getAccessToken()}`};
  
  return dispatch => {
    dispatch(submitPDISurveyBegin());
    return axios.post(`${API_URL}/survey/pdisurvey`, survey, { headers })
      .then(res => dispatch(submitPDISurveySuccess(res.data)))
      .catch(error => dispatch(submitPDISurveyFailure(error)));
  };
  
}

// Helper functions give access to the status of the request 
export const fetchPDISurveysBegin = () => ({
  type: FETCH_PDISURVEYS_BEGIN
});

export const fetchPDISurveysSuccess = surveys => ({
  type: FETCH_PDISURVEYS_SUCCESS,
  payload: {
    surveys
  }
});

export const fetchPDISurveysFailure = error => ({
  type: FETCH_PDISURVEYS_FAILURE,
  payload: {
    error
  }
});

// Fetch surveys for a particular user with Access Token 
export function fetchPDISurveys() {
  const { getAccessToken } = auth0client;
  const API_URL = MEDLOCK_API;
  const headers = { 'Authorization': `Bearer ${getAccessToken()}`};
  
  return dispatch => {
    dispatch(fetchPDISurveysBegin());
    return axios.get(`${API_URL}/survey/pdisurvey`, { headers })
      .then(res => {
        console.log(res.data);
        dispatch(fetchPDISurveysSuccess(res.data));
      })
      .catch(error => dispatch(fetchPDISurveysFailure(error)));
  };
} 

export const submitIntakeSurveyBegin = () => ({
  type: SUBMIT_INTAKESURVEY_BEGIN
});

export const submitIntakeSurveySuccess = survey => ({
  type: SUBMIT_INTAKESURVEY_SUCCESS,
  payload: {
    survey
  }
});

export const submitIntakeSurveyFailure = error => ({
  type: SUBMIT_INTAKESURVEY_FAILURE,
  payload: {
    error
  }
});

// Submit a survey to the server 
export function submitIntakeSurvey(survey) {

  console.log("Intake Survey Actions"); 
  console.log(survey); 

  const { getAccessToken } = auth0client;
  const API_URL = MEDLOCK_API;
  const headers = { 'Authorization': `Bearer ${getAccessToken()}`};
  
  return dispatch => {
    dispatch(submitIntakeSurveyBegin());
    return axios.post(`${API_URL}/survey/intake`, survey, { headers })
      .then(res => dispatch(submitIntakeSurveySuccess(res.data)))
      .catch(error => dispatch(submitIntakeSurveyFailure(error)));
  };
}

export const submitExitSurveyBegin = () => ({
  type: SUBMIT_EXITSURVEY_BEGIN
});

export const submitExitSurveySuccess = survey => ({
  type: SUBMIT_EXITSURVEY_SUCCESS,
  payload: {
    survey
  }
});

export const submitExitSurveyFailure = error => ({
  type: SUBMIT_EXITSURVEY_FAILURE,
  payload: {
    error
  }
});

// Submit a survey to the server 
export function submitExitSurvey(survey) {

  console.log("Exit Survey Actions"); 
  console.log(survey); 

  const { getAccessToken } = auth0client;
  const API_URL = MEDLOCK_API;
  const headers = { 'Authorization': `Bearer ${getAccessToken()}`};
  
  return dispatch => {
    dispatch(submitExitSurveyBegin());
    return axios.post(`${API_URL}/survey/exitsurvey`, survey, { headers })
      .then(res => dispatch(submitExitSurveySuccess(res.data)))
      .catch(error => dispatch(submitExitSurveyFailure(error)));
  };
}