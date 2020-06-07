const axios = require('axios');
const config_servers = require('../../config/servers');
const roles = require('./roles');
const MEDLOCK_URL = config_servers.MEDLOCK_URL;


/**
 * fetchAMT() sends an HTTPS POST request to the MedLock Auth0 API for the 
 * API Managment Token (AMT). The AMT is needed 
 */
function fetchAMT() {
    const headers = { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': MEDLOCK_URL,
     }; 
    const body = { 
        "client_id":"Wf9NsAneKffcZ8y24IhMzjZ4C3JvIken",
        "client_secret":"sPFQ_UQ1G5e20F87cc2MDU-BDjzG1i9CHEnOISfnuHSgyYGvI_zhXQR5nsZto-tA",
        "audience":"https://medlock-dev.auth0.com/api/v2/",
        "grant_type":"client_credentials"
    }; 
    const API_URL = `https://medlock-dev.auth0.com/oauth/token`;
    var promise = axios.post(API_URL, body, headers); 
    return promise; 
}

exports.fetchRoles = function fetchRoles(user_id) {
    console.log("fetching roles");
    return fetchAMT().then(res => {
        console.log("AMT fetched.");
        const AMT = res.data.access_token;
        const API_URL = `https://medlock-dev.auth0.com/api/v2/users/${user_id}/roles`;
        const headers = { 
            authorization: `Bearer ${AMT}`,
        };

        var promise = axios.get(API_URL, { headers });
        return promise;
    })
    .catch(error => {
        console.log(error);
    });
};

/**
 * @param newUser contains name, email, and generated password of new user
 */
exports.register = function register(newUser) {
    console.log("registering new user");
    return fetchAMT().then(res => {
        const AMT = res.data.access_token;
        const API_URL = 'https://medlock-dev.auth0.com/api/v2/users';
        const headers = { authorization: `Bearer ${AMT}`, 'content-type': 'application/json' };

        // Auth0 doesn't allow for their to be extra info, so we create a new
        // object from newUser to send to Auth0 for registration
        var newAuth = {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            "connection": "Username-Password-Authentication",
        };

        var promise = axios.post(API_URL, newAuth, { headers });
        return promise;
    }).catch(error => {
        console.log(error);
    });
}

/**
 * @param id the Auth0 id of the user
 * @param role role to assign to user 
 */
exports.assignRole = function assignRole(id, role) {
    // sanitize inputs
    // convert role to all lowercase letters
    role = role.toLowerCase();

    console.log(`assigning ${role} role to user(id=${id})`);
    return fetchAMT().then(res => {
        const AMT = res.data.access_token;
        const API_URL = `https://medlock-dev.auth0.com/api/v2/users/${id}/roles`;
        const headers = { authorization: `Bearer ${AMT}`, 'Content-Type': 'application/json' };

        // request body
        var req_body = {};

        // based on desired role to assign to user, attach role unique identifier 
        // to the request body
        switch(role) {
            case roles.PATIENT: 
                req_body = {
                    "roles": [
                        "rol_3rJHjXxeLiD1ZJLo" 
                    ]
                };
                break; 
            case roles.PROVIDER: 
                req_body = {
                    "roles": [
                        "rol_eXgwl6628aJ35Cq4" 
                    ]
                };
                break; 
            default: 
                break;
        } 

        var promise = axios(API_URL, req_body, { headers });
        return promise;
    }).catch(error => {
        console.log(error);
    });
}