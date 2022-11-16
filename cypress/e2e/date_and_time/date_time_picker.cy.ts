import { LocalServer } from "../../support/utils";
import { VieoloUIInteraction } from 'cypresstools';

describe("Date and Time", () => {

  it("Date Time Picker", () => {

    LocalServer.start("Date and Time", "Date Time Picker");

    VieoloUIInteraction.selectDateFromDateTimePicker("Date and Time", "01/01/2020");

    VieoloUIInteraction.textInput("Date and Time Time", "12:30");

  });

});
