import { LocalServer } from "../../support/utils";

describe("Charts", () => {

  it("Bar Chart", () => {

    LocalServer.start("Charts", "Bar Chart");

    cy.get('.vieolo-bar-chart').should('be.visible').and(chart => {
      expect(chart.height()).greaterThan(400);
      expect(chart.width()).greaterThan(400);
    });

  });

});