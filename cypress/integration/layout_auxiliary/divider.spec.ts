import TestColors from "../../support/constants";
import { LocalServer, VieoloUIInteraction } from "../../support/utils";

describe("Layout Auxiliary", () => {

  it("Divider Color", () => {

    LocalServer.start('Layout/Auxiliary', 'Divider');

    VieoloUIInteraction.selectOptionFromSelect("Color Type", "normal");

    cy.get('.height--vh-50 > div > div').hasBackgroundColor(TestColors.PRIMARY_COLOR_NORMAL);

  });

  it("Divider Background Color", () => {

    LocalServer.start('Layout/Auxiliary', 'Divider');

    cy.get('.height--vh-50').hasBackgroundColor(TestColors.TERTIARY_COLOR_LIGHT);
  });

});