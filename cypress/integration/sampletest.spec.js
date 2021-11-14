/// <reference types="Cypress" />

context('Assertions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    describe('Implicit Assertions', () => {
        it('.should() - make an assertion about the current subject', () => {
            // https://on.cypress.io/should
            cy.get('#root').should('be.visible')

            // a better way to check element's text content against a regular expression
            // is to use "cy.contains"
            // https://on.cypress.io/contains
            /*    cy.get('.assertion-table')
                 .find('tbody tr:last')
                 // finds first <td> element with text content matching regular expression
                 .contains('td', /column content/i)
                 .should('be.visible')
          */
            // for more information about asserting element's text
            // see https://on.cypress.io/using-cypress-faq#How-do-I-get-an-element’s-text-contents
        })
    })
})
