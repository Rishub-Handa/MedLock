import { SUBMIT_SURVEY } from '../actions/types';

const initialState = {
    responses: {} 
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SUBMIT_SURVEY: 
            console.log(action.payload);
            return {
                responses: action.payload
            }
        default:
            return state;
    }
}


