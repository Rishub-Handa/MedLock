import {
    UPLOAD_DOCUMENTS_BEGIN,
    UPLOAD_DOCUMENTS_SUCCESS,
    UPLOAD_DOCUMENTS_FAILURE,
} from '../actions/types';

const initialState = {
    documents: [],
    documentsUploading: false,
    documentsUploadError: null,
}

export default function(state = initialState, action) {
    switch (action.type) {
        case UPLOAD_DOCUMENTS_BEGIN: 
            return {
                ...state, 
                documentsUploading: true,
            };
        case UPLOAD_DOCUMENTS_SUCCESS: 
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
        default:
            return state;
    }
}