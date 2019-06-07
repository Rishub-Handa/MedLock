import { SUBMIT_SURVEY, FETCH_ALL_SURVEYS } from './types'; 
const axios = require('axios'); 

export const submitSurvey = survey => dispatch => {
    console.log(survey);
    axios.post('http://localhost:5000/api/pdisurvey', survey)
        .then(res => {
            
            dispatch({
                type: SUBMIT_SURVEY, 
                payload: res.data
            })
        }) 
        .catch(err => console.log(err)); 
}

export const fetchAllSurveys = () => dispatch => {
    console.log("Trying to get survey responses...");
    axios.get('http://localhost:5000/api/pdisurvey')
        .then(res => {
            dispatch({
                type: FETCH_ALL_SURVEYS,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}
