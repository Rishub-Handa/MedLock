import {
  CREATE_PATIENT_PROFILE_BEGIN,
  CREATE_PATIENT_PROFILE_SUCCESS,
  CREATE_PATIENT_PROFILE_FAILURE,

  ADD_PATIENT_BEGIN,
  ADD_PATIENT_SUCCESS,
  ADD_PATIENT_FAILURE,

  REMOVE_PATIENT_BEGIN,
  REMOVE_PATIENT_SUCCESS,
  REMOVE_PATIENT_FAILURE,

  FETCH_PATIENTS_BEGIN,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_FAILURE,

  DELETE_ALL_PATIENTS_BEGIN,
  DELETE_ALL_PATIENTS_SUCCESS,
  DELETE_ALL_PATIENTS_FAILURE,

  DELETE_PATIENT_BEGIN,
  DELETE_PATIENT_SUCCESS,
  DELETE_PATIENT_FAILURE,

  FETCH_ALL_PATIENTS_BEGIN,
  FETCH_ALL_PATIENTS_SUCCESS,
  FETCH_ALL_PATIENTS_FAILURE,

} from './types';

import axios from 'axios';
import auth0client from '../auth/Auth';
import { MEDLOCK_API, MEDLOCK_AUTH0 } from '../config/servers';
import { fetchAMT } from '../auth/AuthManagement';

const createPatientProfileBegin = () => ({
  type: CREATE_PATIENT_PROFILE_BEGIN
});

const createPatientProfileSuccess = patient => ({
  type: CREATE_PATIENT_PROFILE_SUCCESS,
  payload: {
    patient
  }
});

const createPatientProfileFailure = error => ({
  type: CREATE_PATIENT_PROFILE_FAILURE,
  payload: {
    error
  }
});


// naming convention ???
export function createPatientProfile(newProfile) {
  const {
    getAccessToken
  } = auth0client;
  let API_URL = `${MEDLOCK_API}/provider/patients`;
  const headers = {
    'Authorization': `Bearer ${getAccessToken()}`
  };

  return dispatch => {
    dispatch(createPatientProfileBegin());
    return axios.post(API_URL, newProfile, {
        headers
      })
      .then(res => {
        console.log(res.data);
        dispatch(createPatientProfileSuccess(res.data));
      })
      .catch(error => dispatch(createPatientProfileFailure(error)));
  }
}

const addPatientBegin = () => ({
  type: ADD_PATIENT_BEGIN
});


const addPatientSuccess = allPatients => ({
  type: ADD_PATIENT_SUCCESS,
  payload: {
    allPatients
  }
});

const addPatientFailure = error => ({
  type: ADD_PATIENT_FAILURE,
  payload: {
    error
  }
});

export function addPatientToProviderList(patient) {
  const {
    getAccessToken
  } = auth0client;
  const API_URL = `${MEDLOCK_API}/provider/patients`;
  const headers = {
    'Authorization': `Bearer ${getAccessToken()}`
  };

  return dispatch => {
    dispatch(addPatientBegin());
    return axios.post(API_URL, patient, {
        headers
      })
      .then(res => dispatch(addPatientSuccess(res.data)))
      .catch(error => {
        console.log(error);
        dispatch(addPatientFailure(error));
      });
  }
}

const removePatientBegin = () => ({
  type: REMOVE_PATIENT_BEGIN
});

const removePatientSuccess = patient => ({
  type: REMOVE_PATIENT_SUCCESS,
  payload: {
    patient
  }
});

const removePatientFailure = error => ({
  type: REMOVE_PATIENT_FAILURE,
  payload: {
    error
  }
});

export function removePatient(id) {
  console.log(`remove patient id=${id}`);
  
  const { getAccessToken } = auth0client;
  const API_URL = `${MEDLOCK_API}/provider/patients`;
  const headers = { 'Authorization': `Bearer ${getAccessToken()}` };


  return dispatch => {
    dispatch(removePatientBegin());
    return axios.delete(API_URL, { 
      headers, 
      data: {
        providerId: auth0client.getProfile().sub.substring(6),
        patientId: id,
      }
    })
      .then(res => {
        console.log(res.data);
        dispatch(removePatientSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(removePatientFailure(err));
      });
  }
}

const fetchPatientsBegin = () => ({
  type: FETCH_PATIENTS_BEGIN
});

const fetchPatientsSuccess = patients => ({
  type: FETCH_PATIENTS_SUCCESS,
  payload: {
    patients
  }
});

const fetchPatientsError = error => ({
  type: FETCH_PATIENTS_FAILURE,
  payload: {
    error
  }
});

export function fetchPatients() {
  const {
    getAccessToken
  } = auth0client;
  const API_URL = `${MEDLOCK_API}/provider/patients`;
  const headers = {
    'Authorization': `Bearer ${getAccessToken()}`
  };

  return dispatch => {
    dispatch(fetchPatientsBegin());
    return axios.get(API_URL, {
        headers
      })
      .then(res => {
        console.log(res.data);
        dispatch(fetchPatientsSuccess(res.data));
      })
      .catch(error => dispatch(fetchPatientsError(error)));
  };
}

const deletePatientBegin = () => ({
  type: DELETE_PATIENT_BEGIN,
})

const deletePatientSuccess = (patients) => ({
  type: DELETE_PATIENT_SUCCESS,
  payload: {
    patients
  }
})

const deletePatientError = (error) => ({
  type: DELETE_PATIENT_FAILURE,
  payload: {
    error
  }
})

export function deletePatient(ids) {
  var url = `${MEDLOCK_API}/admin/patient`;

  return dispatch => {
    dispatch(deletePatientBegin());
    fetchAMT()
      .then(res => {
        const AMT = res.data.access_token;
        return axios.delete(url, {
          data: {
            AMT, 
            ids,
          }
        })
          .then(res => dispatch(deletePatientSuccess(res.data)))
          .catch(err => dispatch(deletePatientError(err)));
      })
  }
}

// const deleteAllPatientsBegin = () => ({
//   type: DELETE_ALL_PATIENTS_BEGIN
// });

// const deleteAllPatientsSuccess = (patients) => ({
//   type: DELETE_ALL_PATIENTS_SUCCESS,
//   payload: {
//     patients
//   }
// });

// const deleteAllPatientsError = (error) => ({
//   type: DELETE_ALL_PATIENTS_FAILURE,
//   payload: {
//     error
//   }
// });

// export function deleteAllPatients() {
//   const {
//     getAccessToken
//   } = auth0client;
//   const API_URL = `${MEDLOCK_API}/admin/patient?_id=$0&deleteAll=true`;
//   const headers = {
//     'Authorization': `Bearer ${getAccessToken()}`
//   };

//   return dispatch => {
//     dispatch(deleteAllPatientsBegin());
//     return axios.delete(API_URL, { headers })
//       .then(res => {
//         console.log(res);
//         dispatch(deleteAllPatientsSuccess(res));
//       })
//       .catch(err => {
//         dispatch(deleteAllPatientsError(err));
//       });
//   }
// }

const fetchAllPatientsBegin = () => ({
  type: FETCH_ALL_PATIENTS_BEGIN
});

const fetchAllPatientsSuccess = patients => ({
  type: FETCH_ALL_PATIENTS_SUCCESS,
  payload: {
    patients
  }
});

const fetchAllPatientsFailure = error => ({
  type: FETCH_ALL_PATIENTS_FAILURE,
  payload: {
    error
  }
});

export function fetchAllPatients() {
  console.log("FETCHING ALL PATIENTS");
  const API_URL = `${MEDLOCK_API}/admin/patient`;
  console.log(API_URL);
  
  return dispatch => {
    dispatch(fetchAllPatientsBegin());
    return axios.get(API_URL)
      .then(res => dispatch(fetchAllPatientsSuccess(res.data)))
      .catch(err => dispatch(fetchAllPatientsFailure(err)));
  }

}

