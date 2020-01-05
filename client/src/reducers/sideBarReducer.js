import {
    COLLAPSE_SIDEBAR,
    EXPAND_SIDEBAR,
    SET_SIDEBAR_TOGGLE,
} from '../actions/types';

const initialState = {
    collapsed: false,
    toggle: false,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case COLLAPSE_SIDEBAR:
            return {
                ...state,
                collapsed: true,
            };
        case EXPAND_SIDEBAR: 
            return {
                ...state,
                collapsed: false
            };
        case SET_SIDEBAR_TOGGLE:
            return {
                ...state,
                toggle: !state.toggle
            };
        default:
            return state;
    }
}