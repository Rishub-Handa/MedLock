import axios from 'axios';

export function fetchAMT() {
    const AMTHeaders = { 'Content-Type': 'application/json' }; 
    const AMTBody = {"client_id":"Wf9NsAneKffcZ8y24IhMzjZ4C3JvIken","client_secret":"sPFQ_UQ1G5e20F87cc2MDU-BDjzG1i9CHEnOISfnuHSgyYGvI_zhXQR5nsZto-tA","audience":"https://medlock-dev.auth0.com/api/v2/","grant_type":"client_credentials"}; 
    const API_URL = `https://medlock-dev.auth0.com/oauth/token`;

    const promise = axios.post(API_URL, AMTBody, AMTHeaders)
        .then(res => {
            console.log(res.data);
            dispatch(fetchAMTSuccess(res.data));
        })
        .catch(error => dispatch(fetchAMTFailure(error)));

    return promise;
}