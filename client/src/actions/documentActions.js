/**
 * Redux actions for interacting with and handling documents.
 * @author Chase Dawson
 */

import {
    UPLOAD_DOCUMENTS_BEGIN,
    UPLOAD_DOCUMENTS_SUCCESS,
    UPLOAD_DOCUMENTS_FAILURE,
} from './types';

import axios from 'axios';
import auth0client from '../auth/Auth';
import { MEDLOCK_API, MEDLOCK_AUTH0 } from '../config/servers';

const uploadDocumentsBegin = () => ({
    type: UPLOAD_DOCUMENTS_BEGIN,
});

const uploadDocumentsSuccess = acceptedDocuments => ({
    type: UPLOAD_DOCUMENTS_SUCCESS,
    payload: {
        acceptedDocuments
    }
});

const uploadDocumentsFailure = error => ({
    type: UPLOAD_DOCUMENTS_FAILURE,
    payload: {
        error
    }
});

export function uploadDocuments(documents) {
    console.log("uploadDocuments called");
    const { getAccessToken } = auth0client;
    const API_URL = `${MEDLOCK_API}/patient/documents`;
    const headers = {
        'Authorization': `Bearer ${getAccessToken()}`
    };

    return dispatch => {
        dispatch(uploadDocumentsBegin());
        return axios.post(API_URL, { documents }, { headers })
            .then(res => {
                dispatch(uploadDocumentsSuccess(res.data));
            })
            .catch(error => {
                dispatch(uploadDocumentsFailure(error));
            });
    }
}

