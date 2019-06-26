import mockAxios from '../__mocks__/axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { loadProfile } from '../../actions/profileActions';

const mockStore = configureMockStore([thunk]);

describe("Profile Actions", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            profile: {}
        });
    });

    describe("loadProfile action creator", () => {
        it(`it dispatches LOAD_PROFILE_BEGIN and, 
            on success, dispatches LOAD_PROFILE_SUCCESS
            and returns data`, async () => {
                
                const mockProfile = {
                    name: "Chase Dawson"
                };

                mockAxios.get.mockImplementationOnce(() => 
                    Promise.resolve({
                        data: mockProfile
                    })
                );

                await store.dispatch(loadProfile());
                const actions = store.getActions();

                // verifies that a certain number of assertions are called during a test
                // useful when testing asynchronous code
                expect.assertions(3);
                expect(actions[0].type).toEqual("LOAD_PROFILE_BEGIN");
                expect(actions[1].type).toEqual("LOAD_PROFILE_SUCCESS");
                expect(actions[1].payload.profile).toEqual(mockProfile);
        });

        it(`it dispatches LOAD_PROFILE_BEGIN and, 
            on failure, dispatches LOAD_PROFILE_FAILURE
            and returns an error`, async () => {
                
                const mockError = "Load Profile Failed.";

                mockAxios.get.mockImplementationOnce(() => 
                    Promise.reject({
                        error: mockError
                    })
                );

                try {
                    await store.dispatch(loadProfile());
                } catch {
                    const actions = store.getActions();
                
                    expect.assertions(3);
                    expect(actions[0].type).toEqual("LOAD_PROFILE_BEGIN");
                    expect(actions[1].type).toEqual("LOAD_PROFILE_FAILURE");
                    expect(actions[1].payload.error).toEqual(mockError);
                }
        });
    });
});