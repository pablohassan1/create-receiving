import "@testing-library/cypress/add-commands";

Cypress.Commands.add("getToken", (email, password) => {
  return cy
    .request("POST", "/api/v1/token/authenticate", {
      username: email,
      password: password,
    })
    .then((res) => res.body.token);
});

Cypress.Commands.add("logout", (email, password) => {
  return cy.getToken(email, password).then((tok) => {
    cy.request("POST", "api/v1/users/logout", {
      token: tok,
    });
  });
});
