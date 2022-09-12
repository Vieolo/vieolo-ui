import { LocalServer } from "../../support/utils";

describe("Dialog", () => {

  it("Form Dialog", () => {

    LocalServer.start("Dialogs", "Form Dialog");

    cy.get('.vieolo-form-dialog').contains("Save").click();

    cy.on('window:alert', (t) => {
      expect(t).contains('saved');
    });
  });

});
