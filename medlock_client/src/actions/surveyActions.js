import { SUBMIT_SURVEY } from './types'; 
const axios = require('axios'); 

export const submitSurvey = (responses) => dispatch => {

    console.log(SUBMIT_SURVEY); 

    axios.post('http://localhost:5000/api/pdisurvey', responses)
        .then(res => dispatch({
            type: SUBMIT_SURVEY, 
            payload: res.data
        })) 
        .catch(err => console.log(err)); 

}

