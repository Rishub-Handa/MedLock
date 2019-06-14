import { FETCH_DISPENSES_BEGIN, FETCH_DISPENSES_SUCCESS, FETCH_DISPENSES_FAILURE } from '../actions/types';

const initialState = {
    dispenses: [],
    loading: false, 
    error: null 
}

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_DISPENSES_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_DISPENSES_SUCCESS:
            return {
                ...state,
                loading: false,
                dispenses: action.payload.dispenses
            };
    
        case FETCH_DISPENSES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                dispenses: []
            }; 
        default:
            return state;
    }; 
}


