import auth0 from 'auth0-js';
import history from '../components/nav/history';

class Auth {
    accessToken;
    idToken;
    expiresAt;
    userProfile;
    scopes;

    requestedScopes = 'openid profile read:patients';

    auth0 = new auth0.WebAuth({
        domain: 'medlock-dev.auth0.com',
        clientID: '1CF1ZJqKO4RVUdkyku4LAWN78tAPhN7l',
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token',
        audience: 'http://localhost:5000',
        scope: this.requestedScopes
    });

    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.getIdToken = this.getIdToken.bind(this);
        this.renewSession = this.renewSession.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    login() {
        console.log("login");
        this.auth0.authorize();
    }

    handleAuthentication() {
        console.log("handleAuthentication");
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else if (err) {
                history.replace('/'); //change to main info page
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }

    getAccessToken() {
        console.log("getAccessToken");
        return this.accessToken;
    }

    getIdToken() {
        console.log("getIdToken");
        return this.idToken;
    }

    setSession(authResult) {
        console.log("setSession");
        // Set isLoggedIn flag in localStorage
        localStorage.setItem('isLoggedIn', 'true');

        // Set the time that the Access Token will expire at
        let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;
        this.expiresAt = expiresAt;
        this.userProfile = authResult.idTokenPayload;
        this.scopes = authResult.scope || this.requestedScopes || '';

        // navigate to the profile page
        history.replace('/dashboard');
    }

    renewSession() {
        console.log("renewSession");
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else if (err) {
                this.logout();
                console.log(err);
                alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
            }
        });
    }

    getProfile() {
        console.log("getProfile");
        return this.userProfile;
    }

    logout() {
        console.log("logout");
        // Remove tokens and expiry time
        this.accessToken = null;
        this.idToken = null;
        this.expiresAt = 0;

        // Remove user profile
        this.userProfile = null;

        // Remove isLoggedIn flag from localStorage
        localStorage.removeItem('isLoggedIn');

        this.auth0.logout({
            returnTo: window.location.origin
        });

        // navigate to the home route
        history.replace('/');
    }

    isAuthenticated() {
        console.log("isAuthenticated");
        // Check whether the current time is past 
        // the access token's expxiry time
        let expiresAt = this.expiresAt;
        return new Date().getTime() < expiresAt;
    }

    silentAuth() {
        console.log("silentAuth");
        return new Promise((resolve, reject) => {
            this.auth0.checkSession({}, (err, authResult) => {
                if (err) {
                    return reject(err);
                }
                this.setSession(authResult);
                resolve();
            });
        });
    }
    
    userHasScopes(scopes) {
        const grantedScopes = this.scopes.split(' ');
        return scopes.every(scope => grantedScopes.includes(scope));
    }

}


const auth0client = new Auth();

export default auth0client;