import { LocalServer } from "../../support/utils";

describe("Form", () => {

  it.only("Checkbox", () => {

    LocalServer.start("Form", "Checkbox");

    cy.get('main').find("input").check();

  });

});
