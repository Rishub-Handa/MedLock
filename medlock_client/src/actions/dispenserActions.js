import { FETCH_DISPENSES_BEGIN, 
        FETCH_DISPENSES_SUCCESS, 
        FETCH_DISPENSES_FAILURE } from './types'; 

const axios = require('axios'); 

export const fetchDispensesBegin = () => ({
    type: FETCH_DISPENSES_BEGIN 
});
  
export const fetchDispensesSuccess = dispenses => ({
    type: FETCH_DISPENSES_SUCCESS,
    payload: { dispenses }
});

export const fetchDispensesFailure = error => ({
    type: FETCH_DISPENSES_FAILURE,
    payload: { error }
});

export function fetchDispenses(id) {
    return dispatch => {
      dispatch(fetchDispensesBegin());
      return axios.get(`http://localhost:5000/api/dispense?id=${id}`)
        .then(res => { 
            dispatch(fetchDispensesSuccess(res.data));
        })
        .catch(error => dispatch(fetchDispensesFailure(error)));
    };
}
