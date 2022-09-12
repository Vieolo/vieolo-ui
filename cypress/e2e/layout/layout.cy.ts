import { LocalServer } from "../../support/utils";

describe("Layout", () => {

  it("Layout Card", () => {

    LocalServer.start('Layout', 'Tab Switch');

    cy.get('.vieolo-tab-switch').contains("Two").click();

  });

});
