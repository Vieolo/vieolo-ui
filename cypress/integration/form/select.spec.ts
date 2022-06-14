import { LocalServer, VieoloUIInteraction } from "../../support/utils";

describe("Form", () => {

  it("Select", () => {

    LocalServer.start("Form", "Select");

    cy.get('.vieolo-select');

    VieoloUIInteraction.selectOptionFromSelect("Item", "Six");

  });

});
