import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchPatients } from '../../actions/patientActions';

const mockStore = configureMockStore([thunk]);

describe("Patient Actions", () => {
    let store;
    let mockAxios;

    beforeEach(() => {
        store = mockStore({

        });
        mockAxios = new MockAdapter(axios);
    });

    describe("fetchPatients action creator", () => {
        it(`dispatches FETCH_PATIENTS_BEGIN and,
            on success, dispatches FETCH_PATIENTS_SUCCESS
            and returns data`, async () => {
                
                const API_URL = 'http://localhost:5000/api/provider/patients';

                mockAxios.onGet(API_URL).reply(200, allPatients);
            });
    });
});