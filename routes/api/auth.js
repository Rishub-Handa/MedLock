const axios = require('axios');
const config_servers = require('../../config/servers');
const roles = require('./roles');
const MEDLOCK_URL = config_servers.MEDLOCK_URL;
const MEDLOCK_AUTH0 = config_servers.MEDLOCK_AUTH0;


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

/**
 * Since Auth0 ids begin with "auth|" and MedLock database ids remove that part of the string. 
 * This function converts any id into a valid Auth0 id if it isn't already.
 * @param {*} id  
 */
function toAuthId(id) {
    var AUTH0_PREFIX = "auth0|";
    var curPrefix = id.substring(0, 6);
    if (curPrefix === AUTH0_PREFIX) {
        // id is already a valid Auth0 id, so return
        return id;
    } else {
        // id is not a valid Auth0 id, append prefix and return
        return AUTH0_PREFIX + id;
    }
}

exports.fetchRoles = function fetchRoles(id) {
    console.log("fetching roles");
    // convert id to Auth0 id
    id = toAuthId(id);
    console.log("id: ");
    console.log(id);
    return fetchAMT().then(res => {
        console.log("AMT fetched.");
        const AMT = res.data.access_token;
        const API_URL = `https://medlock-dev.auth0.com/api/v2/users/${id}/roles`;
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
    // convert id to Auth0 id
    id = toAuthId(id);
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
                throw new Error(`${role} is an invalid role.`);
        } 

        var promise = axios.post(API_URL, req_body, { headers });
        return promise;
    }).catch(error => {
        console.log(error);
    });
}

exports.deleteUser = function deleteUser(id) {
    console.log(`deleting user(id=${id}) from Auth0`);
    // convert id to Auth0 id
    id = toAuthId(id);
    var API_URL = `${MEDLOCK_AUTH0}/v2/users/${auth_id}`;
    return fetchAMT().then(res => {
        const AMT = res.data.access_token;
        const headers = { authorization: `Bearer ${AMT}`};
        var promise = axios.delete(API_URL, { headers })
            .then(() => console.log(`user(id=${id}) deleted from Auth0`))
            .catch(err => console.log(`Auth0: ${err}`));
        return promise;
    });
} 