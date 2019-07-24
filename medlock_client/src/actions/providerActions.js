import {
    CREATE_PROVIDER_PROFILE_BEGIN, 
    CREATE_PROVIDER_PROFILE_SUCCESS, 
    CREATE_PROVIDER_PROFILE_FAILURE, 

    FETCH_ALL_PROVIDERS_BEGIN,
    FETCH_ALL_PROVIDERS_SUCCESS,
    FETCH_ALL_PROVIDERS_FAILURE,

    DELETE_PROVIDER_BEGIN,
    DELETE_PROVIDER_SUCCESS,
    DELETE_PROVIDER_FAILURE,

} from './types';

import axios from 'axios';
import auth0client from '../auth/Auth'; 
import { MEDLOCK_API } from '../config/servers';
import { fetchAMT } from '../auth/AuthManagement';

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

const fetchAllProvidersBegin = () => ({
    type: FETCH_ALL_PROVIDERS_BEGIN
  });
  
const fetchAllProvidersSuccess = providers => ({
    type: FETCH_ALL_PROVIDERS_SUCCESS,
    payload: {
        providers
    }
});

const fetchAllProvidersFailure = error => ({
    type: FETCH_ALL_PROVIDERS_FAILURE,
    payload: {
        error
    }
});

export function fetchAllProviders() {
    console.log("FETCHING PROVIDERS");
    const API_URL = `${MEDLOCK_API}/admin/provider`;

    return dispatch => {
        dispatch(fetchAllProvidersBegin());
        return axios.get(API_URL)
            .then(res => dispatch(fetchAllProvidersSuccess(res.data)))
            .catch(err => dispatch(fetchAllProvidersFailure(err)));
    }
}

const deleteProviderBegin = () => ({
    type: DELETE_PROVIDER_BEGIN
});

const deleteProviderSuccess = provider => ({
    type: DELETE_PROVIDER_SUCCESS,
    payload: {
        provider
    }
});

const deleteProviderFailure = error => ({
    type: DELETE_PROVIDER_FAILURE,
    payload: {
        error
    }
});

export function deleteProvider(ids) {
    var url = `${MEDLOCK_API}/admin/provider`;

    return dispatch => {
        dispatch(deleteProviderBegin());
        fetchAMT()
            .then(res => {
                const AMT = res.data.access_token;
                return axios.delete(url, {
                    data: {
                        AMT, 
                        ids,
                    }
                })
                    .then(res => dispatch(deleteProviderSuccess(res.data)))
                    .catch(err => dispatch(deleteProviderFailure(err)));
            });
    }

}   

