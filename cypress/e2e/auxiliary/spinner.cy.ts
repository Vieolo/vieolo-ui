import { LocalServer } from "../../support/utils";

describe("Auxiliary", () => {

  it("Spinner Visibility", () => {

    LocalServer.start("Auxiliary", "Spinner");

    cy.get('main > div > svg > circle').should('be.visible');

  });

  it("Spinner Details Log", () => {

    LocalServer.start("Auxiliary", "Spinner");

    return cy.get('main > div > svg > circle').then(circle => {
      cy.log("X-coordinate : " + circle.attr("cx"));
      cy.log("Y-coordinate : " + circle.attr("cy"));
      cy.log("Radius : " + circle.attr("r"));
      cy.log("Stroke Width : " + circle.attr("stroke-width"));
      cy.log("Fill Color : " + circle.attr("fill"));
    });

  });

});