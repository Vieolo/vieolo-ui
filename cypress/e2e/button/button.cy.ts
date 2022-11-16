import TestColors from '../../support/constants';
import { LocalServer } from '../../support/utils';
import { VieoloUIInteraction } from 'cypresstools'

describe("Button", () => {

    it("Opens Button", () => {

        LocalServer.start("Buttons", "Button");

        cy.get("main").find(".vieolo-button").hasBackgroundColor(TestColors.BACKGROUND_CONTENT_COLOR);
    });

    it("Opens Button Change Color", () => {

        LocalServer.start("Buttons", "Button");

        VieoloUIInteraction.selectOptionFromSelect("Color", "secondary");
        VieoloUIInteraction.selectOptionFromSelect("Emphasis", "high");

        cy.get("main").find(".vieolo-button").hasBackgroundColor(TestColors.SECONDARY_COLOR_NORMAL);
    });

});