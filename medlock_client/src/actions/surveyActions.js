import {
  SUBMIT_SURVEY_BEGIN,
  SUBMIT_SURVEY_SUCCESS,
  SUBMIT_SURVEY_FAILURE,
  FETCH_PDISURVEYS_BEGIN,
  FETCH_PDISURVEYS_SUCCESS,
  FETCH_PDISURVEYS_FAILURE
} from './types';
import auth0client from '../auth/Auth';


const axios = require('axios');

export const submitSurveyBegin = () => ({
  type: SUBMIT_SURVEY_BEGIN
});

export const submitSurveySuccess = survey => ({
  type: SUBMIT_SURVEY_SUCCESS,
  payload: {
    survey
  }
});

export const submitSurveyFailure = error => ({
  type: SUBMIT_SURVEY_FAILURE,
  payload: {
    error
  }
});

export function submitSurvey(survey) {
  const { getAccessToken } = auth0client;
  const API_URL = 'http://localhost:5000/api';
  const headers = { 'Authorization': `Bearer ${getAccessToken()}`};
  return dispatch => {
    dispatch(submitSurveyBegin());
    return axios.post(`${API_URL}/pdisurvey`, survey, { headers })
      .then(res => dispatch(submitSurveySuccess(res.data)))
      .catch(error => dispatch(submitSurveyFailure(error)));
  };
  
}

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

export function fetchPDISurveys() {
  const { getAccessToken } = auth0client;
  const API_URL = 'http://localhost:5000/api';
  const headers = { 'Authorization': `Bearer ${getAccessToken()}`};
  
  return dispatch => {
    dispatch(fetchPDISurveysBegin());
    return axios.get(`${API_URL}/pdisurvey`, { headers })
      .then(res => {
        console.log(res.data);
        dispatch(fetchPDISurveysSuccess(res.data));
      })
      .catch(error => dispatch(fetchPDISurveysFailure(error)));
  };
}