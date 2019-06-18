import { 
    CREATE_PROFILE_BEGIN,
    CREATE_PROFILE_SUCCESS,
    CREATE_PROFILE_FAILURE,
    LOAD_PROFILE_BEGIN,
    LOAD_PROFILE_SUCCESS,
    LOAD_PROFILE_FAILURE,
    SAVE_PROFILE_BEGIN,
    SAVE_PROFILE_SUCCESS,
    SAVE_PROFILE_FAILURE,
    EDIT_PROFILE,
    ADD_PROFILE_MODULE_BEGIN,
    ADD_PROFILE_MODULE_SUCCESS,
    ADD_PROFILE_MODULE_FAILURE
} from '../actions/types';

const initialState = {
    profile: {
        _id: null,
        name: null,
        bio: null
    },
    editable: false,
    loading: false,
    profileLoaded: false,
    profileCreated: false,
    creating: false,
    addingNewProfileModule: false,
    error: null,
    profileModules: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_PROFILE_BEGIN:
            return {
                ...state,
                creating: true,
            };
        case CREATE_PROFILE_SUCCESS:
            return {
                ...state,
                creating: false,
                profileCreated: true,
                profile: action.payload.profile
            };
        case CREATE_PROFILE_FAILURE:
            return {
                ...state, 
                creating: false,
                error: action.payload.error
            };
        case LOAD_PROFILE_BEGIN:
            return {
                ...state,
                loading: true
            };
        case LOAD_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                profileLoaded: true,
                profile: action.payload.profile
            };
        case LOAD_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                profileLoaded: true,
                error: action.payload.error
            };
        case EDIT_PROFILE: 
            return {
                ...state,
                editable: true,
            };
        case SAVE_PROFILE_BEGIN:
            return {
                ...state,
                editable: false,
                loading: true,
                error: null
            };
        case SAVE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                profile: action.payload.newProfile
            };
        case SAVE_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        case ADD_PROFILE_MODULE_BEGIN:
            return {
                ...state,
                editable: false,
                addingNewProfileModule: true,
            };
        case ADD_PROFILE_MODULE_SUCCESS: 
            return {
                ...state,
                addingNewProfileModule: false,
                profileModule: action.payload.newProfileModule
            };
        case ADD_PROFILE_MODULE_FAILURE: 
            return {
                ...state,
                addingNewProfileModule: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}



