import axios from 'axios'; 
import { MEDLOCK_URL } from '../config/servers';


export function getUserByEmail(email, AMT) {
    const API_URL = `https://medlock-dev.auth0.com/api/v2/users-by-email?email=${email}`;
    const headers = { authorization: `Bearer ${AMT}`, 
                    'content-type': 'application/json' };
    
    const promise = axios.get(API_URL, { headers }); 

    return promise; 
}


// TODO: remove all dependences of fetchAMT
// it isn't secure to have this in client
// export function fetchAMT() {
//     console.log("called function: fetchAMT");
//     const AMTHeader = { 
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': MEDLOCK_URL,
//      }; 
//     const AMTBody = {"client_id":"Wf9NsAneKffcZ8y24IhMzjZ4C3JvIken","client_secret":"sPFQ_UQ1G5e20F87cc2MDU-BDjzG1i9CHEnOISfnuHSgyYGvI_zhXQR5nsZto-tA","audience":"https://medlock-dev.auth0.com/api/v2/","grant_type":"client_credentials"}; 
//     const API_URL = `https://medlock-dev.auth0.com/oauth/token`;
//     console.log(AMTHeader);
//     const promise = axios.post(API_URL, AMTBody, AMTHeader); 

//     return promise; 

// }

export function resetPassword(email) {
    const URL = 'https://medlock-dev.auth0.com/dbconnections/change_password'; 
    const headers = { 'Content-Headers': 'application/json' }; 
    const body = {
        'client_id': 'Wf9NsAneKffcZ8y24IhMzjZ4C3JvIken', 
        'email': email, 
        'connection': 'Username-Password-Authentication' 
    } 

    const promise = axios.post(URL, body, headers) 
        .then(res => {
            console.log(`Reset Password: ${res.data}`); 
        }) 
        .catch(error => console.log(error)); 
        
    return promise; 
        
} 

// THERE IS NO SECURITY HERE ??? 
// Store hashed password ??? 
// This does NOT work at the moment. 
export function newPassword(password, user_id, AMT) {
    const URL = `https://medlock-dev.auth0.com/api/v2/users/${user_id}`; 
    const headers = { 'Content-Type': 'application/json', 
                    authorization: `Bearer ${AMT}` }; 
    const body = {
        'password': password, 
        'connection': 'Username-Password-Authentication' 
    }

    const promise = axios.patch(URL, body, headers) 
        .then(res => {
            console.log(`New Password: ${res.data}`); 
        }) 
        .catch(error => console.log(error)); 
        
    return promise; 
        
}
