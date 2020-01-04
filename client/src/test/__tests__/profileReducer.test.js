import profileReducer from '../../reducers/profileReducer';

describe('Profile Reducer', () => {
    
    const initialState = {
        profile: null,
        editable: false,
        profileLoading: false,
        profileLoaded: false,
        profileCreated: false,
        profileCreating: false,
        profileCreateError: null, 
        profileSaving: false, 
        addingNewProfileModule: false,
        profileError: null,
        profileModules: [] 
    };

    it('returns the initial state when an action type is not passed', () => {
        const reducer = profileReducer(undefined, {});
        expect(reducer).toEqual(initialState);
    });

    it('handles LOAD_PROFILE_BEGIN as expected', () => {
        const reducer = profileReducer(initialState, { type: "LOAD_PROFILE_BEGIN" });
        
        const newState = {
            ...initialState,
            profileLoading: true
        };

        expect(reducer).toEqual(newState);
    });

    it('handles LOAD_PROFILE_SUCCESS as expected', () => {
        const mockProfile = {
            id: "scd3dz",
            name: "Chase Dawson",
            bio: "Student at UVA."
        };
        
        const reducer = profileReducer(initialState, {
            type: "LOAD_PROFILE_SUCCESS",
            payload: {
                profile: mockProfile
            }
        });

        const newState = {
            ...initialState,
            profileLoading: false,
            profileLoaded: true,
            profile: mockProfile
        };

        expect(reducer).toEqual(newState);
    });

    it('handles LOAD_PROFILE_FAILURE as expected', () => {
        const mockError = "Load Profile Failed.";
        
        const reducer = profileReducer(initialState, {
          type: "LOAD_PROFILE_FAILURE",
          payload: {
              error: mockError
          }  
        });

        const newState = {
            ...initialState,
            profileLoading: false,
            profileLoaded: true,
            profileError: mockError
        };

        expect(reducer).toEqual(newState);
    });

    it('handles SAVE_PROFILE_BEGIN as expected', () => {
        const reducer = profileReducer(initialState, {
            type: "SAVE_PROFILE_BEGIN"
        });

        const newState = {
            ...initialState,
            editable: false,
            profileSaving: true,
            profileError: null
        };

        expect(reducer).toEqual(newState);
    });

    it('handles SAVE_PROFILE_SUCCESS as expected', () => {
        const mockUpdatedPersonalData = {
            name: "Rishub Handa",
            email: "rh4gh@virginia.edu"
        }
        
        const reducer = profileReducer(initialState, {
            type: "SAVE_PROFILE_SUCCESS",
            payload: {
                updatedPersonalData: mockUpdatedPersonalData
            }
        });

        const newState = {
            ...initialState,
            profileSaving: false,
            profile: {
                personalData: mockUpdatedPersonalData
            }
        };

        expect(reducer).toEqual(newState);
    });

    it('handles SAVE_PROFILE_FAILURE as expected', () => {
        const mockError = "Save Profile Failed.";

        const reducer = profileReducer(initialState, {
            type: "SAVE_PROFILE_FAILURE",
            payload: {
                error: mockError
            }
        });

        const newState = {
            ...initialState,
            profileSaving: false,
            error: mockError
        };

        expect(reducer).toEqual(newState);
    });
    
});