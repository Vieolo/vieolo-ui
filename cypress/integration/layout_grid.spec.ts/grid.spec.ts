import { LocalServer } from "../../support/utils";

describe("Layout/Grid", () => {

  it("Layout/Grid Card", () => {

    LocalServer.start('Layout/Grid', 'Grid');

    cy.get(".vieolo-grid").should("be.visible");

    cy.get(".vieolo-grid").find("div").should("have.length", 14);

  });

  it("Layout/Grid Data Log", () => {

    LocalServer.start('Layout/Grid', 'Grid');

    cy.get(".vieolo-grid").within(() => {
      const data = {};
      cy.get("div").each((item, index) => {
        data[index] = item.text();
      });
      cy.log(data.toString());
    });

  });

});
