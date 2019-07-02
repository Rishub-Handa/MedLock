import { 
    SUBMIT_SURVEY_BEGIN,
    SUBMIT_SURVEY_SUCCESS,
    SUBMIT_SURVEY_FAILURE, 
    FETCH_PDISURVEYS_BEGIN,
    FETCH_PDISURVEYS_SUCCESS,
    FETCH_PDISURVEYS_FAILURE,
} from '../actions/types';

const initialState = {
    surveyResponse: null,
    responses: [],
    surveysLoading: false, 
    surveysLoaded: false,
    loading: false,
    error: null 
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SUBMIT_SURVEY_BEGIN: 
            return {
                ...state,
                loading: true,
                error: null
            };
        case SUBMIT_SURVEY_SUCCESS:
            return {
                ...state,
                loading: false,
                surveyResponse: action.payload.survey
            };
        case SUBMIT_SURVEY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case FETCH_PDISURVEYS_BEGIN:
            return {
                ...state,
                surveysLoading: true,
                error: null
            };
        case FETCH_PDISURVEYS_SUCCESS:
            return {
                ...state,
                surveysLoading: false,
                surveysLoaded: true,
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


