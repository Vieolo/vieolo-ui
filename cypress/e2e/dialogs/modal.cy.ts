import { LocalServer } from "../../support/utils";

describe("Dialog", () => {

  it("Modal", () => {

    LocalServer.start("Dialogs", "Modal");

    cy.get('.vieolo-button').click();
    cy.get('.vieolo-modal').find('.vieolo-icon-button').click();

  });
});