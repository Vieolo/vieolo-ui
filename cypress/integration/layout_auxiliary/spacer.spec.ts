import TestColors from "../../support/constants";
import { LocalServer } from "../../support/utils";

describe("Layout Auxiliary", () => {

  it("Upper Spacer", () => {

    LocalServer.start('Layout/Auxiliary', 'Spacer');

    cy.get('.background-color--secondary-normal').hasBackgroundColor(TestColors.SECONDARY_COLOR_NORMAL);

  });

  it("Lower Spacer", () => {

    LocalServer.start('Layout/Auxiliary', 'Spacer');

    cy.get('.background-color--success-normal').hasBackgroundColor(TestColors.SUCCESS_COLOR_NORMAL);

  });

});
