describe('login', () => {
    it('should successfully log in', () => {
        cy.login()
            .then((res) => {
                return res.body;
            })
            .then((body) => {
                const { access_token, expires_in, id_token } = body;
                const auth0State = {
                    nonce: '',
                    state: 'some-random-state' 
                };
                const callbackUrl = `http://localhost:3000/callback#access_token=${access_token}&scope=openid&id_token=${id_token}=&expires_in=${expires_in}&toekn_type=Bearer&state=${auth0State.state}`;
                cy.visit(callbackUrl, {
                    onBeforeLoad(win) {
                        win.document.cookie = 'com.auth0.auth.some-random-state=' + JSON.stringify(auth0State);
                    }
                });
            })
    });
});

describe('Dashboard', () => {
    it('Clicks Inbox', () => {
        cy.get('.inbox-dashIcon').click()
        cy.url()
            .should('include', '/inbox')
    });
    it('Clicks Resources', () => {
        cy.get('resources-dashIcon').click()
    });
    it('Clicks My Patients', () => {
        cy.get('mypatients-dashIcon').click()
    });
    it('Clicks Profile', () => {
        cy.get('profile-dashIcon').click()
    });

    beforeEach(() => {
        cy.visit('http://localhost:3000/dashboard')
    })
})