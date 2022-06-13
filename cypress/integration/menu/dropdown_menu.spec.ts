import { LocalServer } from "../../support/utils";

describe("Menu", () => {

  it("Menu Card", () => {

    LocalServer.start("Menu", "Drop Down Menu");

    cy.get('.vieolo-button').click();

    cy.getByAriaLabel("Three select item").click();

  });

});
