import { LocalServer } from "../../support/utils";

describe("Form", () => {

  it("Checkbox", () => {

    LocalServer.start("Form", "Checkbox");

    cy.get('main').find("input").check();

  });

});
