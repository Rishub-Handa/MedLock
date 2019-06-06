import { SAVE_PROFILE, EDIT_PROFILE } from './types';
import axios from 'axios';

export const saveProfile = (newProfile) => dispatch => {
    console.log(SAVE_PROFILE);

    const action = {
        type: SAVE_PROFILE,
        payload: {}
    }
    // what happens if post is unsuccessful
    axios.post("http://localhost:5000/api/patient", newProfile)
        .then(res => {
            action.payload = res.data.profile;
            dispatch(action);
        })
        .catch(err => console.log(err));

};

export const editProfile = () => dispatch => {
    console.log(EDIT_PROFILE);
    const action = {
        type: EDIT_PROFILE
    }
    dispatch(action);
};

