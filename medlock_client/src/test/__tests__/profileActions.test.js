import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { loadProfile, saveProfile } from '../../actions/profileActions';

const mockStore = configureMockStore([thunk]);

describe("Profile Actions", () => {
    let store;
    let mockAxios;

    beforeEach(() => {
        store = mockStore({
            profile: {}
        });
        mockAxios = new MockAdapter(axios);
    });

    describe("loadProfile action creator", () => {
        it(`dispatches LOAD_PROFILE_BEGIN and, 
            on success, dispatches LOAD_PROFILE_SUCCESS
            and returns data`, async () => {
                
                const API_URL = 'http://localhost:5000/api/patient';
                
                const mockProfile = {
                    name: "Chase Dawson"
                };

                mockAxios.onGet(API_URL).reply(200, mockProfile);

                await store.dispatch(loadProfile("Patient"));
                const actions = store.getActions();

                // verifies that a certain number of assertions are called during a test
                // useful when testing asynchronous code
                expect.assertions(3);
                expect(actions[0].type).toEqual("LOAD_PROFILE_BEGIN");
                expect(actions[1].type).toEqual("LOAD_PROFILE_SUCCESS");
                expect(actions[1].payload.profile).toEqual(mockProfile);
        });

        it(`dispatches LOAD_PROFILE_BEGIN and, 
            on failure, dispatches LOAD_PROFILE_FAILURE
            and returns an error`, async () => {
                
                const API_URL = 'http://localhost:5000/api/patient';

                const mockError = "Load Profile Failed.";
 
                mockAxios.onGet(API_URL).reply(500, mockError);

                try {
                    await store.dispatch(loadProfile("Patient"));
                } catch {
                    const actions = store.getActions();
                
                    expect.assertions(3);
                    expect(actions[0].type).toEqual("LOAD_PROFILE_BEGIN");
                    expect(actions[1].type).toEqual("LOAD_PROFILE_FAILURE");
                    expect(actions[1].payload.error).toEqual(mockError);
                }
        });
    });

    describe("saveProfile action creator", () => {
        it(`dispatches SAVE_PROFILE_BEGIN and,
            on success, dispatches SAVE_PROFILE_SUCCESS
            and returns data`, async () => {
            
                const API_URL = 'http://localhost:5000/api/patient';

                const mockUpdatedPersonalData = {
                    name: "Rishub Handa"
                };

                mockAxios.onPut(API_URL, mockUpdatedPersonalData).reply(200, mockUpdatedPersonalData);

                await store.dispatch(saveProfile(mockUpdatedPersonalData));
                const actions = store.getActions();
                console.log(actions);

                expect.assertions(3);
                expect(actions[0].type).toEqual("SAVE_PROFILE_BEGIN");
                expect(actions[1].type).toEqual("SAVE_PROFILE_SUCCESS");
                expect(actions[1].payload.updatedPersonalData).toEqual(mockUpdatedPersonalData);
        });

        it(`dispatches SAVE_PROFILE_BEGIN and,
            on failure, dispatches SAVE_PROFILE_FAILURE
            and returns error`, async () => {
                const API_URL = 'http://localhost:5000/api/patient';

                const mockUpdatedPersonalData = {
                    name: "Rishub Handa"
                };

                const mockError = "Save Profile Failed.";

                mockAxios.onPut(API_URL, mockUpdatedPersonalData).reply(500, mockError);

                try {
                    await store.dispatch(saveProfile(mockUpdatedPersonalData));
                } catch {
                    const actions = store.getActions();
                
                    expect.assertions(3);
                    expect(actions[0].type).toEqual("SAVE_PROFILE_BEGIN");
                    expect(actions[1].type).toEqual("SAVE_PROFILE_FAILURE");
                    expect(actions[1].payload.error).toEqual(mockError);
                }
            });
    });
});