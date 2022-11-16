import { LocalServer } from "../../support/utils";
import { VieoloUIInteraction } from 'cypresstools'

describe("Time Input", () => {

  it("Date Time Picker", () => {

    LocalServer.start("Date and Time", "Time Input");

    VieoloUIInteraction.textInput("Time", "12:30");

  });

});
