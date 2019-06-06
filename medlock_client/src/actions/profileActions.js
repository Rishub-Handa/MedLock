import { SAVE_PROFILE, EDIT_PROFILE } from './types';

export const saveProfile = (newProfile) => dispatch => {
    console.log(SAVE_PROFILE);
    const action = {
        type: SAVE_PROFILE,
        payload: newProfile
    }
    dispatch(action);
};

export const editProfile = () => dispatch => {
    console.log(EDIT_PROFILE);
    const action = {
        type: EDIT_PROFILE
    }
    dispatch(action);
};

