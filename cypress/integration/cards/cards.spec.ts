import { LocalServer } from "../../support/utils";

describe("Cards", () => {

  it("Clickable Card", () => {

    LocalServer.start("Cards", "Clickable Card");

    cy.contains("With Icon").click();

    cy.contains("With Description").click();

    cy.get("main").find(".vieolo-card");

    cy.contains("Start a new Project");

  });

});
