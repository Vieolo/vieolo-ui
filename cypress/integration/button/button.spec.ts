import TestColors from '../../support/constants';
import { LocalServer, VieoloUIInteraction } from '../../support/utils';

describe("Button", () => {

    it("Opens Button", () => {

        LocalServer.start("Buttons", "Button");

        cy.get("main").find(".vieolo-button").hasBackgroundColor(TestColors.PRIMARY_COLOR_NORMAL);
    });

    it("Opens Button Change Color", () => {

        LocalServer.start("Buttons", "Button");

        VieoloUIInteraction.selectOptionFromSelect("Color", "secondary");

        cy.get("main").find(".vieolo-button").hasBackgroundColor(TestColors.SECONDARY_COLOR_NORMAL);
    });

});