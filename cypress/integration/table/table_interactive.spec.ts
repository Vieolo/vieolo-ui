import { LocalServer } from "../../support/utils";

describe("Table", () => {

  it("Table Card", () => {

    LocalServer.start("Table", "Table Interactive");

    cy.getByAriaLabel('row 1 cell 3').click();

    cy.get('main').find('input').clear().type('new item 0{enter}');

  });

});
