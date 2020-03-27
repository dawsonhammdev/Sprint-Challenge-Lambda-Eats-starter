describe("test our form", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/pizza");
    })
    it("add text to input to name", () => {
        cy.get('input[name="name"]')
        .type("Dawson")
        .should("have.value", "Dawson");
        cy.get('#size')
      .select('medium')
      .should("have.value", "medium")
      cy.get('[type="checkbox"]')
      .check()
      .should("be.checked")
      cy.get("textarea")
        .type("Well Done")
        .should("have.value", "Well Done");
      cy.get('button').click()
    })

    it("Testing for validation", function() {
        cy.get('input[name="name"]')
        .type("Dawson").clear()
        cy.get('[data-cy="nameError"]')
        .should('be.visible')
    })
})