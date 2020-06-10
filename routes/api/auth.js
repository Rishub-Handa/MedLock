const axios = require('axios');
const config_servers = require('../../config/servers');
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
        const AMT = res.data.access_token;
        const API_URL = `https://medlock-dev.auth0.com/api/v2/users/${user_id}/roles`;
        const headers = { 
            authorization: `Bearer ${AMT}`,
        };

        var promise = axios.get(API_URL, { headers });
        console.log(promise);
        return promise;
    });
};