import {
  SUBMIT_SURVEY,
  FETCH_PDISURVEYS_BEGIN,
  FETCH_PDISURVEYS_SUCCESS,
  FETCH_PDISURVEYS_FAILURE
} from './types';
import auth0client from '../auth/Auth';


const axios = require('axios');

export const submitSurvey = survey => dispatch => {
  const { getAccessToken } = auth0client;
  const API_URL = 'http://localhost:5000/api';
  const headers = { 'Authorization': `Bearer ${getAccessToken()}`};
  axios.post(`${API_URL}/pdisurvey`, survey, { headers })
    .then(res => {
      dispatch({
        type: SUBMIT_SURVEY,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
}

// export const fetchAllSurveys = () => dispatch => {
//     console.log("Trying to get survey responses...");
//     axios.get('http://localhost:5000/api/pdisurvey')
//         .then(res => {
//             dispatch({
//                 type: FETCH_ALL_SURVEYS,
//                 payload: res.data
//             })
//         })
//         .catch(err => console.log(err));
// } 

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