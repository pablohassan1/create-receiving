/// <reference types='Cypress' />

export const username = () => cy.get("#login_username");
export const password = () => cy.get("#login_password");
export const loginButton = () => cy.findByRole("button", { name: "login" });

export const login = (email, pass) => {
  cy.logout(email, pass);
  cy.visit("/");
  username().type(email);
  password().type(pass);
  loginButton().click();
};
