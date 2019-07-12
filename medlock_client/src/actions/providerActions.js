import {
    CREATE_PROVIDER_PROFILE_BEGIN, 
    CREATE_PROVIDER_PROFILE_SUCCESS, 
    CREATE_PROVIDER_PROFILE_FAILURE, 
} from './types';

import axios from 'axios';
import auth0client from '../auth/Auth'; 

const createProviderProfileBegin = () => ({
    type: CREATE_PROVIDER_PROFILE_BEGIN
});

const createProviderProfileSuccess = provider => ({
    type: CREATE_PROVIDER_PROFILE_SUCCESS,
    payload: {
        provider
    }
});

const createProviderProfileFailure = error => ({
    type: CREATE_PROVIDER_PROFILE_FAILURE,
    payload: {
        error
    }
});

// If Administrator creates provider, different than if a provider creates a provider. 
// Adminstrators may create physicians, physicians may create nurses, caretakers, and others. 
export function createProviderProfile(newProfile, creatorScope) {
    const { getAccessToken } = auth0client;
    let API_URL = ""; 
    
    switch(creatorScope) {
        case "Admin": 
            API_URL = 'http://localhost:5000/api/admin/provider'; 
            break; 
        case "Provider": 
            API_URL = 'http://localhost:5000/api/provider'; 
            break; 
        default: 
            API_URL = 'http://localhost:5000/api/provider'; 
    }


    const headers = { 'Authorization': `Bearer ${getAccessToken()}`};

    return dispatch => {
        dispatch(createProviderProfileBegin());
        return axios.post(API_URL, newProfile, { headers })
            .then(res => {alert(`Provider Added Successfully`); dispatch(createProviderProfileSuccess(res.data))})
            .catch(error => {alert(`Failed To Create Provider. Error Code: ${error}`); dispatch(createProviderProfileFailure(error))});
    }
}

