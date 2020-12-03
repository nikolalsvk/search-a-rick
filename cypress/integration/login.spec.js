describe("Login flow", () => {
  it("logs in the user", () => {
    cy.visit("/login");

    cy.get("#email").type("test@rick.morty");
    cy.get("#password").type("beth123");

    cy.get(".justify-between > .bg-pink-700").click();

    cy.url().should("eq", "http://localhost:3000/");
    cy.contains("Character name").should("be.visible");
  });

  it("shows validation errors", () => {
    cy.visit("/login");

    cy.get("#email").type("test@rick.morty");

    cy.contains("Please choose a password.").should("be.visible");
  });

  it("shows error from server", () => {
    cy.visit("/login");

    cy.get("#email").type("test@rick.morty");
    cy.get("#password").type("random sifra");

    cy.get(".justify-between > .bg-pink-700").click();

    cy.contains("Wrong credentials.").should("be.visible");
  });
});
