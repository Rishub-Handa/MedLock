import { 
    FETCH_DISPENSER_BEGIN,
    FETCH_DISPENSER_SUCCESS,
    FETCH_DISPENSER_FAILURE,
    UPDATE_BUTTON_MEANING_BEGIN,
    UPDATE_BUTTON_MEANING_SUCCESS,
    UPDATE_BUTTON_MEANING_FAILURE, 
} from '../actions/types';

const initialState = {
    dispenser: {},
    dispenses: [],
    loading: false, 
    dispenserLoading: false,
    dispenserLoaded: false,
    error: null 
}

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_DISPENSER_BEGIN:
            return {
                ...state,
                dispenserLoading: true,
                error: null
            };
        case FETCH_DISPENSER_SUCCESS:
            return {
                ...state,
                dispenserLoading: false,
                dispenserLoaded: true,
                dispenser: action.payload.dispenser
            };
    
        case FETCH_DISPENSER_FAILURE:
            return {
                ...state,
                dispenserLoading: false,
                dispenserLoaded: true,
                error: action.payload.error,
            }; 
        case UPDATE_BUTTON_MEANING_BEGIN:
            return {
                ...state,
                dispenserLoading: true,
                dispenserLoaded: false,
            };
        case UPDATE_BUTTON_MEANING_SUCCESS:
            console.log(action.payload.dispenser);
            return {
                ...state,
                dispenserLoading: false,
                dispenserLoaded: true,
                dispenser: action.payload.dispenser,
            };
        case UPDATE_BUTTON_MEANING_FAILURE:
            return {
                ...state,
            };
        default:
            return state;
    }; 
}


