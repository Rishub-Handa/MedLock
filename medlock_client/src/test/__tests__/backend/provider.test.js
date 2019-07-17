import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { auth0Registration, assignRoles } from '../../../actions/authActions'; 
import { createProviderProfile } from '../../../actions/providerActions'; 
import { fetchPatients } from '../../../actions/patientActions';

const mockStore = configureMockStore([thunk]);

describe("/provider/patients endpoint", () => {
    
    let store;
    let testProvider = {
        userProfile: {},
        authResult: {}
    };

    beforeAll( async () => {

        store = mockStore({
            userProfile: {}
        });

        const AMT = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik56WTBPRVF3TkRjME9FSkRNRGMwT0RNMk5EZENSVFkxTmpkRFFUa3dORFV5UmpBMFFVWkdOZyJ9.eyJpc3MiOiJodHRwczovL21lZGxvY2stZGV2LmF1dGgwLmNvbS8iLCJzdWIiOiJXZjlOc0FuZUtmZmNaOHkyNEloTXpqWjRDM0p2SWtlbkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9tZWRsb2NrLWRldi5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTU2MzIwNzM1MywiZXhwIjoxNTYzMjkzNzUzLCJhenAiOiJXZjlOc0FuZUtmZmNaOHkyNEloTXpqWjRDM0p2SWtlbiIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgcmVhZDphbm9tYWx5X2Jsb2NrcyBkZWxldGU6YW5vbWFseV9ibG9ja3MgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMgcmVhZDplbWFpbF90ZW1wbGF0ZXMgY3JlYXRlOmVtYWlsX3RlbXBsYXRlcyB1cGRhdGU6ZW1haWxfdGVtcGxhdGVzIHJlYWQ6bWZhX3BvbGljaWVzIHVwZGF0ZTptZmFfcG9saWNpZXMgcmVhZDpyb2xlcyBjcmVhdGU6cm9sZXMgZGVsZXRlOnJvbGVzIHVwZGF0ZTpyb2xlcyByZWFkOnByb21wdHMgdXBkYXRlOnByb21wdHMgcmVhZDpicmFuZGluZyB1cGRhdGU6YnJhbmRpbmciLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.UtOKjx5gTvXL4I88_MbPeYrVLkgvVuOUwIEUzG_JzD3A3DAKlzKhwGslK02qXrGluVgH2zBIuCd_2glDhkF-qmlTLlI7KNzVQAnWOBL8o5Ly2m8JGbeBG3TN77ZVVsgjQAKoeyJeouXHzGW3F9Sf2eii-pwqnkGLwc9TPSfJkStZRceO5ZknICZjOr6h8jg0SzAW64MCSqF_TApm7q98Q2STnKj1oJ6j2K-q1uUCvfiuTyNvXqdXN9fbbDWezxn9jTuoZQE9WpglWh7Kfx4b6DvT1QUuooEAGd81uFobVE92k85_o8XrCUL44zxcxw85iJ085qzC6Zwop6Dr6Uf-aA";

        const providerInfo = {
            "name": "TEST PROVIDER",
            "email": "s.c.dawson54@gmail.com",
            "password": "TestProvider!123",
            "connection": "Username-Password-Authentication"
        };

        // create test provider profile in auth0
        await store.dispatch(auth0Registration(providerInfo, AMT));
        const actions = store.getActions();
        console.log(actions[1].payload.userProfile);
        testProvider.userProfile = actions[1].payload.userProfile;

        // create test provider profile in MedLock db
        await store.dispatch(createProviderProfile({
                _id: testProvider.userProfile.user_id.substring(6),
                personalData: {
                    name: testProvider.userProfile.name,
                    email: testProvider.userProfile.email
                }   
        }, "Admin"));

        // assign Provider role to test provider
        await store.dispatch(assignRoles(testProvider.userProfile.user_id, AMT, "Provider"));
        const API_URL = "https://medlock-dev.auth0.com/oauth/token";
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        const params =   { 
            grant_type: 'password',
            username: providerInfo.email,
            password: providerInfo.password,
            audience: 'http://localhost:5000',
            scope: 'openid',
            client_id: '1CF1ZJqKO4RVUdkyku4LAWN78tAPhN7l',
            client_secret: '9KehLwVpY_YAEkPEct03DizxEkZpTNa3tNFvUanVotpOnlZ5wStrzdOsGuaiRH2H'
        };

        //"client_secret":"sPFQ_UQ1G5e20F87cc2MDU-BDjzG1i9CHEnOISfnuHSgyYGvI_zhXQR5nsZto-tA","audience":"https://medlock-dev.auth0.com/api/v2/"
        await axios.post(API_URL, params, { headers })
            .then(res => {
                testProvider.authResult = res;
                console.log(res);
            })
            .catch(error => console.log(error));
    });

    describe("GET", () => {
        it(`submits successful GET request to /provider/patients endpoint`, () => {
            console.log("TEST");
        });
    });

    // delete test provider and any created patients
    afterAll( async () => {
        console.log("After All");
    });
});