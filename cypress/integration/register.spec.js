describe("Register flow", () => {
  beforeEach(() => {
    cy.request("http://localhost:3001/users/clean_db");
  });

  it("registers a user", () => {
    cy.visit("/sign_up");

    cy.get("#first-name").type("Rick");
    cy.get("#last-name").type("Sanchez");
    cy.get("#email").type("test@rick.com");
    cy.get("#password").type("beth123");

    // cy.get(".bg-white > .bg-pink-700").click();
    // cy.get("[data-testid=sign-up-button]").click();
    cy.getByTestId("sign-up-button").click();

    cy.url().should("include", "/login");
  });
});
