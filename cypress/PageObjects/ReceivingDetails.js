/// <reference types='Cypress' />

export const verifyAsn = (asn) => cy.findByRole("heading", { name: asn });
export const verifyAccount = (account) =>
  cy.findByRole("link", { name: account });

export const supplierNameVerify = (name) =>
  supplierName().should("have.value", name);

export const supplierName = () =>
  cy.get('[data-test = "receivingSupplierName"]');

export const saveForm = () => cy.findByRole("button", { name: "Save" }).click();
