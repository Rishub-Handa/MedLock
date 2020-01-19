import { 
    SUBMIT_PDISURVEY_BEGIN,
    SUBMIT_PDISURVEY_SUCCESS,
    SUBMIT_PDISURVEY_FAILURE, 
    FETCH_PDISURVEYS_BEGIN,
    FETCH_PDISURVEYS_SUCCESS,
    FETCH_PDISURVEYS_FAILURE,
    SUBMIT_INTAKESURVEY_BEGIN, 
    SUBMIT_INTAKESURVEY_SUCCESS, 
    SUBMIT_INTAKESURVEY_FAILURE 
} from '../actions/types';

const initialState = {
    PDISurveyResponse: null,
    PDIResponses: [],
    PDISurveysLoading: false, 
    PDISurveysLoaded: false,
    PDILoading: false,
    PDIError: null, 
    IntakeLoading: false, 
    IntakeError: null, 
    IntakeSurveyResponse: null 
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SUBMIT_PDISURVEY_BEGIN: 
            return {
                ...state,
                PDILoading: true,
                PDIError: null
            };
        case SUBMIT_PDISURVEY_SUCCESS:
            return {
                ...state,
                PDILoading: false,
                PDISurveyResponse: action.payload.survey
            };
        case SUBMIT_PDISURVEY_FAILURE:
            return {
                ...state,
                PDILoading: false,
                PDIError: action.payload.error
            }
        case FETCH_PDISURVEYS_BEGIN:
            return {
                ...state,
                PDISurveysLoading: true,
                PDIError: null
            };
        case FETCH_PDISURVEYS_SUCCESS:
            return {
                ...state,
                PDISurveysLoading: false,
                PDISurveysLoaded: true,
                PDIResponses: action.payload.surveys
            };
        case FETCH_PDISURVEYS_FAILURE:
            return {
                ...state,
                PDILoading: false,
                PDIError: action.payload.error,
                PDIResponses: []
            }; 
        case SUBMIT_INTAKESURVEY_BEGIN: 
            return {
                ...state,
                IntakeLoading: true,
                IntakeError: null
            };
        case SUBMIT_INTAKESURVEY_SUCCESS:
            return {
                ...state,
                IntakeLoading: false,
                IntakeSurveyResponse: action.payload.survey
            };
        case SUBMIT_INTAKESURVEY_FAILURE:
            return {
                ...state,
                IntakeLoading: false,
                IntakeError: action.payload.error
            }
        default:
            return state;
    }; 
}


