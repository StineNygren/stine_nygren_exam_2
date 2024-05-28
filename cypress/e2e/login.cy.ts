/// <reference types="cypress" />
describe("logs in to Holidaze", () => {
  it("goes to login form and logs in", () => {
    //logs in
    cy.visit("/login");
    cy.wait(500);
    cy.get("input#login_email_input").type("pertore@stud.noroff.no", { delay: 0 });
    cy.get("input#login_password_input").type("testtest321", { delay: 0 });
    cy.get("#login_btn").click();
    cy.wait(500);
    cy.get("h1").contains("Hotells for you!");
  });
});
