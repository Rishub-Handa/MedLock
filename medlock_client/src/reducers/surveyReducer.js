import { SUBMIT_SURVEY, FETCH_PDISURVEYS_BEGIN, FETCH_PDISURVEYS_SUCCESS, FETCH_PDISURVEYS_FAILURE } from '../actions/types';

const initialState = {
    responses: [],
    loading: false, 
    error: null 
}

export default function(state = initialState, action) {
    switch (action.type) {

        case SUBMIT_SURVEY: 
            console.log(action.payload);
            return {
                responses: action.payload
            }
        case FETCH_PDISURVEYS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_PDISURVEYS_SUCCESS:
            return {
                ...state,
                loading: false,
                // responses: action.payload.surveys
                responses: action.payload.surveys
            };
    
        case FETCH_PDISURVEYS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                responses: []
            }; 
        default:
            return state;
    }; 
}


