// describe('Login Page', () => {
//     it('Visits Login', () => {
//         cy.visit('http://localhost:3000/')
//     })

//     it('Clicks Login', () => {
//         cy.get('.login-btn').click()
//     })
// })

describe('Dashboard', () => {
    it('Clicks Inbox', () => {
        cy.get('.inbox-dashIcon').click()
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
})