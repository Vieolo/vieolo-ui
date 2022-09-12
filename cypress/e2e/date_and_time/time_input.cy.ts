import { LocalServer, VieoloUIInteraction } from "../../support/utils";

describe("Time Input", () => {

  it("Date Time Picker", () => {

    LocalServer.start("Date and Time", "Time Input");

    VieoloUIInteraction.textInput("Time", "12:30");

  });

});
