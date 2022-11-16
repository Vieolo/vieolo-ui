import { LocalServer } from "../../support/utils";
import { VieoloUIInteraction } from 'cypresstools'


describe("Date and Time", () => {

  it("Date Picker", () => {

    LocalServer.start("Date and Time", "Date Picker");

    VieoloUIInteraction.selectDateFromDatePicker("date picker", "01/01/2021");

  });

});
