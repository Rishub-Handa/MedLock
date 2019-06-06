import { SAVE_PROFILE } from '../actions/types';

const initialState = {
    user: {
        name: '',
        bio: ''
    }
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SAVE_PROFILE:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

