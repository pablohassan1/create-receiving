/// <reference types='Cypress' />

export const accountSelectToggle = () =>
  cy.get('[data-test = "accountSelect"]').click();

export const warehouseSelectToggle = () =>
  cy.get('button[name = "warehouse"]').click();

export const generateButton = () => cy.get('[data-test = "generateButton"]');

export const selectOption = (option) =>
  cy.findByRole("option", { name: option }).click();

export const getAsn = () => {
  return cy.get("input[name = 'asn']").invoke("val");
};

export const generateAsn = () => {
  cy.get("input[name = 'asn']").should("have.value", "");
  generateButton().click();
  cy.get("input[name = 'asn']").should("not.have.value", "");
};

export const supplierName = () =>
  cy.get('[data-test = "receivingSupplierName"]');

export const estimatedDelivery = () => {
   cy.get('[data-test = "receivingEstimatedDelivery"]').click();
  cy.get('[data-test = "dateTable"]').within(() => {
    cy.get("button[data-test='currentDay']").click();
  });
};

export const typeOfPackingToggle = () =>
  cy.findByRole("button", { name: "Types" }).click();

export const typeDescription = (text) =>
  cy.get("input[name = 'description']").type(text);

export const typeBoxQuantity = (count) =>
  cy.get("input[name = 'box_quantity']").type(count);

export const addTrackingNumber = (number) => {
  cy.get("input[name = 'tracking']").type(number);
  cy.findByRole("button", { name: "Add" }).click();
  cy.contains(".Table__Td", number);
};

export const saveForm = () => cy.findByRole("button", { name: "Save" }).click();

export const productSearch = (productName) => {
  cy.get('[data-test = "productSearch"]').type(productName);
  cy.contains("li", productName).click();
};

export const verifyReceivingCreated = () =>
  cy.findByText("Receiving created").should("be.visible");
