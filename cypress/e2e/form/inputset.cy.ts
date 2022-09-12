import { LocalServer } from "../../support/utils";

describe("Form", () => {

  it("Input Set", () => {

    LocalServer.start("Form", "Input Set");

    cy.get('.vieolo-input-set');

    cy.get('.vieolo-input').type('test');

  });

});
