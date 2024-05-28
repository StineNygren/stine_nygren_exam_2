///  <reference types="cypress" />
describe("Search trough venues", () => {
    it("goes to home page and search", () => {
      //search
      cy.visit("/");
      cy.wait(500);
        cy.get("input#search_input").type("Disney Castle", { delay: 0 });
        cy.wait(500);
        cy.get('.venue-name').contains('Disney Castle');
    });
  });
  