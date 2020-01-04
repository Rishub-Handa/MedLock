describe('My First Test', () => {
    it('Clicks an element', () => {
        // Arrange - setup initial app state
        // - visit a web page
        cy.visit('https://example.cypress.io')
        // - query for an element
        cy.contains('type').click()
        // Act - take an action
        // - interact with that element
        // Assert - make an assertion
        // - make an assertion about page content
        cy.url()
            .should('include', '/commands/actions')

        cy.get('.action-email')
            .type('fake@email.com')
            .should('have.value', 'fake@email.com')
    })
})