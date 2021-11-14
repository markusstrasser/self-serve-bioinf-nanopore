/// <reference types="Cypress" />


//.filter(test => test.isSeenBy(user)) 
context('Assertions', () => {

    it("shows", () => {
        // cy.visit('/');
        cy.get(".transform_transform1").contains("Transform:: transform1")


    })

    it("graphs change on transform change", () => {
        // cy.visit('/');
        // cy.get(".transform_transform1").contains("Transform:: transform1")
        cy.get(".component_c123").within(() => {
            cy.get("svg>g>g>g>line").eq(0).invoke('attr', 'y2').should('eq', "100")

        })

        cy.get(".transform_transform2").within(() => {
            cy.wait(3000)
            cy.get("button").eq(0).click()

        })

        cy.get(".component_c123").within(() => {
            cy.get("svg>g>g>g>line").eq(0).invoke('attr', 'y2').should('eq', "200")

        })




    })
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

})

