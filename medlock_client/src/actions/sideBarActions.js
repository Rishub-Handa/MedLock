import { 
    COLLAPSE_SIDEBAR, 
    EXPAND_SIDEBAR,
    SET_SIDEBAR_TOGGLE,
} from './types';

export function collapseSideBar() {
    return dispatch => dispatch({ type: COLLAPSE_SIDEBAR });
}

export function expandSideBar() {
    return dispatch => dispatch({ type: EXPAND_SIDEBAR });
}

export function setSideBarToggle() {
    return dispatch => dispatch({ type: SET_SIDEBAR_TOGGLE });
}

