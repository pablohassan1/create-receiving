/// <reference types='Cypress' />

import * as LoginPage from "../PageObjects/LoginPage";
import * as CreateReceiving from "../PageObjects/CreateReceiving";
import * as ReceivingDetails from "../PageObjects/ReceivingDetails";
import { getTrackingNumber } from "../support/utils";

describe("Create receiving", () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  beforeEach(function () {
    cy.intercept("/api/v1/token/validate").as("validated");
    cy.intercept("/api/v1/admin/products/find/xxx?account=*").as("itemFound");
    cy.intercept("/api/v1/receivings").as("receivingCreated");

    LoginPage.login(username, password);
    cy.wait("@validated");
    cy.visit("/receivings/create");
  });

  it("should create and edit receiving", function () {
    const trackingNumber = getTrackingNumber();
    const account = "Demo";
    const supplierNameEdited = "Random name edited";

    CreateReceiving.accountSelectToggle();
    CreateReceiving.selectOption(account);
    CreateReceiving.warehouseSelectToggle();
    CreateReceiving.selectOption("Florida");
    CreateReceiving.generateAsn();
    CreateReceiving.getAsn().then((asn) => {
      CreateReceiving.supplierName().type("Random name");
      CreateReceiving.estimatedDelivery();
      CreateReceiving.typeOfPackingToggle();
      CreateReceiving.selectOption("Boxes");
      CreateReceiving.typeDescription("e2e test");
      CreateReceiving.typeBoxQuantity(2);
      CreateReceiving.addTrackingNumber(trackingNumber);
      CreateReceiving.productSearch("xxx");
      cy.wait("@itemFound");
      CreateReceiving.saveForm();
      cy.wait("@receivingCreated");
      CreateReceiving.verifyReceivingCreated();
      cy.log("created receiving");
      ReceivingDetails.verifyAsn(asn);
      ReceivingDetails.verifyAccount(account);
    });
    ReceivingDetails.supplierName().clear().type(supplierNameEdited);
    ReceivingDetails.saveForm();
    cy.log("edited receiving");
    ReceivingDetails.supplierNameVerify(supplierNameEdited);
  });
});
