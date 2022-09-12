import { LocalServer, VieoloUIInteraction } from "../../support/utils";
describe("Date and Time", () => {

  it("Date Picker", () => {

    LocalServer.start("Date and Time", "Date Input");

    VieoloUIInteraction.textInput("Date", "12/01/2020");

    cy.get("main").contains("12/01/2020");

  });

});
