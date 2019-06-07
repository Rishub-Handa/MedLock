import { SUBMIT_SURVEY } from './types'; 
const axios = require('axios'); 

export const submitSurvey = survey => (dispatch) => {

    console.log(survey);

    axios.post('http://localhost:5000/api/pdisurvey', survey)
        .then(res => {
            
            dispatch({
                type: SUBMIT_SURVEY, 
                payload: res.data
            })}
        ) 
        .catch(err => console.log(err)); 
}

