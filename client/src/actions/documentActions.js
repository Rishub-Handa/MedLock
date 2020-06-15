/**
 * Redux actions for interacting with and handling documents.
 * @author Chase Dawson
 */

import {
    UPLOAD_DOCUMENTS_BEGIN,
    UPLOAD_DOCUMENTS_SUCCESS,
    UPLOAD_DOCUMENTS_FAILURE,
    FETCH_DOCUMENTS_BEGIN,
    FETCH_DOCUMENTS_SUCCESS,
    FETCH_DOCUMENTS_FAILURE,
    DELETE_DOCUMENT_BEGIN,
    DELETE_DOCUMENT_SUCCESS,
    DELETE_DOCUMENT_FAILURE,
} from './types';

import axios from 'axios';
import auth0client from '../auth/Auth';
import { MEDLOCK_API, MEDLOCK_AUTH0 } from '../config/servers';

var request = require('superagent');


const uploadDocumentsBegin = () => ({
    type: UPLOAD_DOCUMENTS_BEGIN,
});

const uploadDocumentsSuccess = documents => ({
    type: UPLOAD_DOCUMENTS_SUCCESS,
    payload: {
        documents
    }
});

const uploadDocumentsFailure = error => ({
    type: UPLOAD_DOCUMENTS_FAILURE,
    payload: {
        error
    }
});

export function uploadDocuments(filesArray) {
    console.log("uploadDocuments called");
    const { getAccessToken } = auth0client;
    const API_URL = `${MEDLOCK_API}/patient/document/upload`;
    const headers = {
        'Authorization': `Bearer ${getAccessToken()}`
    };

    return dispatch => {
        dispatch(uploadDocumentsBegin());
        var req = request
                .post(API_URL)
                .set('Authorization', `Bearer ${getAccessToken()}`);
            
        // attach documents to request
        for (var i in filesArray) {
            req.attach(filesArray[i][0].name, filesArray[i][0]);
        }

        return req.then(res => {
            console.log(res);
            console.log(res.body);
            dispatch(uploadDocumentsSuccess(res.body));
        }).catch(err => {
            console.log('error');
            dispatch(uploadDocumentsFailure(err));
        })
    }
        
        


            // req.end((err, res) => {
            //     // called when response is received
            //     if (err) {
            //         console.log("error occured");
            //     } else {
            //         for (var i in filesToBeSent) {
            //             filesSent.push(filesToBeSent[i]);
            //         }
                    
            //         this.setState({
            //             ...this.state,
            //             uploadingFiles: false,
            //             filesToBeSent: [],
            //             filesSent,
            //         });
            //     }
            // });
        
    // with axios
    // return dispatch => {
    //     dispatch(uploadDocumentsBegin());
    //     return axios.post(API_URL, { documents }, { headers })
    //         .then(res => {
    //             dispatch(uploadDocumentsSuccess(res.data));
    //         })
    //         .catch(error => {
    //             dispatch(uploadDocumentsFailure(error));
    //         });
    // }
}


const fetchDocumentsBegin = () => ({
    type: FETCH_DOCUMENTS_BEGIN,
});

const fetchDocumentsSuccess = documents => ({
    type: FETCH_DOCUMENTS_SUCCESS,
    payload: {
        documents
    }
});

const fetchDocumentsFailure = error => ({
    type: FETCH_DOCUMENTS_FAILURE,
    payload: {
        error
    }
});

export function fetchDocuments() {
    console.log("fetchDocuments called");
    // used to authorize request to server, provides JWT
    const API_URL = `${MEDLOCK_API}/patient/document`;
    // places JWT in header so that request is authorized
    const { getAccessToken } = auth0client;
    const headers = {
        'Authorization': `Bearer ${getAccessToken()}`
    };

    return dispatch => {
        dispatch(fetchDocumentsBegin());
        return axios.get(API_URL, { headers })
            // after successful GET request, res.data should contain all
            // patient documents
            .then(res => {
                // dispatch action with patient documents 
                // to document reducer to update app state
                dispatch(fetchDocumentsSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchDocumentsFailure(err));
            });
    }
}


const deleteDocumentBegin = (documentId) => ({
    type: DELETE_DOCUMENT_BEGIN,
    payload: {
        documentId
    }
});

const deleteDocumentSuccess = documents => ({
    type: DELETE_DOCUMENT_SUCCESS,
    payload: {
        documents
    }
});

const deleteDocumentFailure = error => ({
    type: DELETE_DOCUMENT_FAILURE,
    payload: {
        error
    }
});

export function deleteDocument(documentId) {
    console.log("deleteDocument called");

    // used to authorize request to server, provides JWT
    const { getAccessToken } = auth0client;
    const API_URL = `${MEDLOCK_API}/patient/document/delete`;
    // places JWT in header so that request is authorized
    const headers = {
        'Authorization': `Bearer ${getAccessToken()}`
    };

    return dispatch => {
        dispatch(deleteDocumentBegin(documentId));
        return axios.post(API_URL, { documentId }, { headers })
            .then(res => {
                // after successful POST request, res contains the server response
                // res.data should contain the updated patient docs, 
                // and the requested document for deletion shouldn't be present
                console.log(res.data);
                dispatch(deleteDocumentSuccess(res.data));
            })
            .catch(err => {
                dispatch(deleteDocumentFailure(err));
            });
    }
}

