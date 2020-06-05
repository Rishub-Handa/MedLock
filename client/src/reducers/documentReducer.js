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
} from '../actions/types';

var _ = require('lodash');

const initialState = {
    documents: [],
    documentsUploading: false,
    documentsUploadError: null,
    documentsFetching: false,
    documentsFetchError: null,
    documentDeleting: false,
    documentDeleteError: null,
}

export default function(state = initialState, action) {
    switch (action.type) {
        case UPLOAD_DOCUMENTS_BEGIN: 
            return {
                ...state, 
                documentsUploading: true,
            };
        case UPLOAD_DOCUMENTS_SUCCESS: 
            console.log(action.payload.documents);
            return {
                ...state, 
                documentsUploading: false,
                documents: action.payload.documents,
            };
        case UPLOAD_DOCUMENTS_FAILURE: 
            return {
                ...state, 
                documentsUploading: false,
                documentsUploadError: action.payload.error
            }; 
        case FETCH_DOCUMENTS_BEGIN:
            return {
                ...state,
                documentsFetching: true,
            };
        case FETCH_DOCUMENTS_SUCCESS:
            return {
                ...state,
                documents: action.payload.documents,
                documentsFetching: false,
            };
        case FETCH_DOCUMENTS_FAILURE:
            return {
                ...state,
                documentsFetchError: action.payload.error,
                documentsFetching: false,
            };
        case DELETE_DOCUMENT_BEGIN: 
            return {
                ...state,
                documentDeleting: true,
            };
        case DELETE_DOCUMENT_SUCCESS:
            return {
                ...state,
                documentDeleting: false,
                documents: action.payload.documents
            };
        case DELETE_DOCUMENT_FAILURE:
            return {
                ...state,
                documentDeleting: false,
                documentDeleteError: action.payload.error
            };
        default:
            return state;
    }
}