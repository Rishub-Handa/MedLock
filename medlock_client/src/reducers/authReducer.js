import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/types';

const initialState = {
    auth: {}
}

export default function(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOGIN_SUCCESS:
        case LOGIN_FAILURE:
        default:
            return state;
    }
}