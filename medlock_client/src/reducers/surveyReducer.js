import { SUBMIT_SURVEY, FETCH_ALL_SURVEYS } from '../actions/types';

const initialState = {
    responses: [],
    allSurveys: []
}

export default function(state = initialState, action) {
    switch (action.type) {

        case SUBMIT_SURVEY: 
            console.log(action.payload);
            return {
                responses: action.payload
            }

        case FETCH_ALL_SURVEYS:
            console.log(FETCH_ALL_SURVEYS);
            return {
                ...state,
                allSurveys: action.payload
            }

        default:
            return state;
    }
}


