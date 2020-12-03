describe("Favorites", () => {
  beforeEach(() => {
    cy.request("http://localhost:3001/users/clean_db");
  });

  it("adds character as favorite", () => {
    /*
    cy.request("POST", "http://localhost:3001/users/sign_in", {
      email: "test@rick.morty",
      password: "beth123",
    }).then((response) => {
      const headers = response.headers;

      localStorage.setItem("token", headers["access-token"]);
    });
    */

    cy.login();

    cy.intercept("https://rickandmortyapi.com/api/character?name=", {
      headers: {
        "Access-Control-Allow-Origin": window.location.origin,
      },
      fixture: "characters",
    });

    cy.visit("/");

    cy.url().should("eq", "http://localhost:3000/");

    cy.contains("Character name").should("be.visible");

    cy.contains("🌟").click();

    cy.contains("❌").click();
  });
});
