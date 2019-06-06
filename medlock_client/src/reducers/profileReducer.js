import { SAVE_PROFILE, EDIT_PROFILE } from '../actions/types';
import axios from 'axios';

const initialState = {
    user: {
        name: "John Doe",
        bio: "Born and Raised in Alabama. 40 years old."
    },
    editable: false,
    profileModules: [
        {
            question: "Question",
            answer: "Answer"

        }
    ]
}

export default function(state = initialState, action) {
    switch (action.type) {
        case EDIT_PROFILE: 
            return {
                ...state,
                editable: true,
            }
        case SAVE_PROFILE:
            return {
                ...state,
                editable: false,
                user: action.payload
            }
        default:
            return state;
    }
}



