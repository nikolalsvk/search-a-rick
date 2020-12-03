describe("Favorites", () => {
  beforeEach(() => {
    cy.request("http://localhost:3001/users/clean_db");
  });

  it("adds character as favorite", () => {
    cy.visit("/login");

    cy.get("#email").type("test@rick.morty");
    cy.get("#password").type("beth123");

    cy.get(".justify-between > .bg-pink-700").click();

    cy.url().should("eq", "http://localhost:3000/");
    cy.contains("Character name").should("be.visible");

    cy.contains("🌟").click();

    cy.contains("❌").click();
  });
});
