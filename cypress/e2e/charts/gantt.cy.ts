import { LocalServer, VieoloUIInteraction } from "../../support/utils";

describe("Charts", () => {

  it("Gantt Chart", () => {

    LocalServer.start("Charts", "Gantt Chart");

    cy.get('.vieolo-gantt-chart').should('be.visible').and(chart => {
      expect(chart.height()).greaterThan(400);
      expect(chart.width()).greaterThan(400);
    });
  });


  it("ganttGetRowAt", () => {

    LocalServer.start("Charts", "Gantt Chart");

    cy.get('.vieolo-gantt-chart');

    VieoloUIInteraction.ganttGetRowAt(0).find(".vieolo-gantt-chart__content-div__row__item-column__title").contains('Item One');

  });

  it("ganttGetAllRow", () => {

    LocalServer.start("Charts", "Gantt Chart");

    cy.get('.vieolo-gantt-chart');

    VieoloUIInteraction.ganttGetAllRow().eq(0).find(".vieolo-gantt-chart__content-div__row__item-column__title").contains('Item One');

  });

});
