describe('Login Page', () => {
    it('Visits Login', () => {
        cy.visit('http://localhost:3000/')
    })

    it('Clicks Login', () => {
        cy.get('.login-btn').click()
    })
})