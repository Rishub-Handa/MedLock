import { SUBMIT_SURVEY } from '../actions/types';

const initialState = {
    responses: {} 
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SUBMIT_SURVEY: 
            return {
                responses: [action.payload, ...state.responses]
            }
        default:
            return state;
    }
}


