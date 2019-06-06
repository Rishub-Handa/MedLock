import { SAVE_PROFILE } from './types';

export const saveProfile = (newProfile) => dispatch => {
    console.log('saving profile...');
    const action = {
        type: SAVE_PROFILE,
        payload: newProfile
    }
    dispatch(action);
}