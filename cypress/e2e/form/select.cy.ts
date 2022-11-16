import { LocalServer } from "../../support/utils";
import { VieoloUIInteraction } from 'cypresstools'

describe("Form", () => {

  it("Select", () => {

    LocalServer.start("Form", "Select");

    cy.get('.vieolo-select');

    VieoloUIInteraction.selectOptionFromSelect("Item", "Six");

  });

});
