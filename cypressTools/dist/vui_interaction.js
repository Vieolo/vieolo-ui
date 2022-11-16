"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Installed Packages
const date_1 = __importDefault(require("@vieolo/date"));
class VieoloUIInteraction {
    static selectDateFromDateTimePicker(label, targetDate, time) {
        cy.get(`[aria-label='${label} Date button']`).focus().type('{enter}');
        cy.get(`[aria-label='${label} Date Search Date']`).focus().type(`${(typeof targetDate === 'string' ? new date_1.default(targetDate) : targetDate).formatDate('dd/mm/yyyy')}{enter}`);
        if (time) {
            cy.getByAriaLabel(`${label} Time`).clear().type(time);
        }
    }
    static selectDateFromDatePicker(label, targetDate) {
        cy.get(`[aria-label='${label} button']`).focus().type('{enter}');
        cy.get(`[aria-label='${label} Search Date']`).focus().type(`${(typeof targetDate === 'string' ? new date_1.default(targetDate) : targetDate).formatDate('dd/mm/yyyy')}{enter}`);
    }
    static ganttGetAllRow() {
        return cy.get(this.GANTT_ROW_CLASS);
    }
    static ganttGetRowAt(index) {
        return this.ganttGetAllRow().eq(index);
    }
    static ganttdragRow(dragIndex, targetIndex, targetPosition) {
        this.ganttGetRowAt(dragIndex).find(".vieolo-gantt-chart__content-div__row__item-column__title").trigger('dragstart', { dataTransfer: new DataTransfer() });
        this.ganttGetRowAt(targetIndex).find(`.vieolo-gantt-chart__content-div__drop-zone--${targetPosition}`).trigger('drop');
    }
    static selectOptionFromSelect(selectTitle, itemTitle, containerLabel) {
        if (containerLabel) {
            cy.getByAriaLabel(containerLabel).find(`[aria-label='Select ${selectTitle}']`).click();
            cy.getByAriaLabel(containerLabel).find(`[aria-label='${itemTitle}']`).click();
        }
        else {
            cy.getByAriaLabel(`Select ${selectTitle}`).click();
            cy.getByAriaLabel(itemTitle).click();
        }
    }
    static textInput(label, text) {
        cy.getByAriaLabel(label).focus().type('{enter}').clear();
        cy.getByAriaLabel(label).focus().type(text);
    }
}
exports.default = VieoloUIInteraction;
VieoloUIInteraction.GANTT_ROW_CLASS = '.vieolo-gantt-chart__content-div__row';
