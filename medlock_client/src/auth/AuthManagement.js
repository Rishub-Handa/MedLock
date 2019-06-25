import axios from 'axios';

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
