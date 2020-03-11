import { 
    LOAD_PROFILE_BEGIN,
    LOAD_PROFILE_SUCCESS,
    LOAD_PROFILE_FAILURE,
    SAVE_PROFILE_BEGIN,
    SAVE_PROFILE_SUCCESS,
    SAVE_PROFILE_FAILURE,
    EDIT_PROFILE,
    ADD_PROFILE_MODULE_BEGIN,
    ADD_PROFILE_MODULE_SUCCESS,
    ADD_PROFILE_MODULE_FAILURE,
    ADD_DISPENSER_CODE_BEGIN, 
    ADD_DISPENSER_CODE_SUCCESS, 
    ADD_DISPENSER_CODE_FAILURE,
    UPDATE_MEDICAL_DATA_BEGIN,
    UPDATE_MEDICAL_DATA_SUCCESS,
    UPDATE_MEDICAL_DATA_FAILURE
} from '../actions/types';

const initialState = {
    profile: null,
    medicalData: null,
    editable: false,
    profileLoading: false,
    profileLoaded: false,
    profileCreated: false,
    profileCreating: false,
    profileCreateError: null, 
    profileSaving: false, 
    addingNewProfileModule: false,
    profileError: null,
    profileModules: [], 
    code: null, 
    codeAdding: false, 
    codeAddedError: null,
    medicalDataUpdating: false,
    medicalDataUpdateError: null,

}

export default function(state = initialState, action) {
    switch (action.type) {
        case LOAD_PROFILE_BEGIN:
            return {
                ...state,
                profileLoading: true
            };
        case LOAD_PROFILE_SUCCESS:
            return {
                ...state,
                profileLoading: false,
                profileLoaded: true,
                profile: action.payload.profile
            };
        case LOAD_PROFILE_FAILURE:
            return {
                ...state,
                profileLoading: false,
                profileLoaded: true,
                profileError: action.payload.error
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
                profileSaving: true, 
                profileError: null
            };
        case SAVE_PROFILE_SUCCESS:
            return {
                ...state,
                profileSaving: false,
                profile: action.payload.profile,
            };
        case SAVE_PROFILE_FAILURE:
            return {
                ...state,
                profileSaving: false,
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
                profileError: action.payload.error
            };
        case ADD_DISPENSER_CODE_BEGIN:
            console.log("Begin adding code. "); 
            return {
                ...state,
                codeAdding: true,
            };
        case ADD_DISPENSER_CODE_SUCCESS: 
            console.log("Success adding code. "); 
            return {
                ...state,
                codeAdding: false,
                code: action.payload.code
            };
        case ADD_DISPENSER_CODE_FAILURE: 
            console.log("Failure adding code. "); 
            return {
                ...state,
                codeAdding: false,
                codeAddedError: action.payload.error
            };
        case UPDATE_MEDICAL_DATA_BEGIN: 
            return {
                ...state,
                medicalDataUpdating: true,
            };
        case UPDATE_MEDICAL_DATA_SUCCESS:
            console.log(state.profile); // probably getting called before the other finishes
            return {
                ...state,
                medicalDataUpdating: false,
                profile: action.payload.profile
            };
        case UPDATE_MEDICAL_DATA_FAILURE: 
            return {
                ...state,
                medicalDataUpdating: false,
                medicalDataUpdateError: action.payload.error
            };
        default:
            return state;
    }
}



