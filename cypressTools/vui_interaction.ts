// Installed Packages
import VDate from '@vieolo/date'

export class VieoloUIInteraction {
    static GANTT_ROW_CLASS = '.vieolo-gantt-chart__content-div__row';

    static selectDateFromDateTimePicker(label: string, targetDate: VDate | string) {
        cy.get(`[aria-label='${label} Date button']`).focus().type('{enter}');
    
        cy.get(`[aria-label='${label} Date Search Date']`).focus().type(`${(typeof targetDate === 'string' ? new VDate(targetDate) : targetDate).formatDate('dd/mm/yyyy')}{enter}`);
    }

    static selectDateFromDatePicker(label: string, targetDate: VDate | string) {
        cy.get(`[aria-label='${label} button']`).focus().type('{enter}');
    
        cy.get(`[aria-label='${label} Search Date']`).focus().type(`${(typeof targetDate === 'string' ? new VDate(targetDate) : targetDate).formatDate('dd/mm/yyyy')}{enter}`);
    }

    static ganttGetAllRow() {
        return cy.get(this.GANTT_ROW_CLASS)
    }

    static ganttGetRowAt(index: number) {
        return this.ganttGetAllRow().eq(index);
    }

    static ganttdragRow(dragIndex: number, targetIndex: number, targetPosition: 'top' | 'bottom') {
        this.ganttGetRowAt(dragIndex).find(".vieolo-gantt-chart__content-div__row__item-column__title").trigger('dragstart', {dataTransfer: new DataTransfer()});
        this.ganttGetRowAt(targetIndex).find(`.vieolo-gantt-chart__content-div__drop-zone--${targetPosition}`).trigger('drop');
    }

    static selectOptionFromSelect(selectTitle: string, itemTitle: string, containerLabel?: string) {
        if (containerLabel) {
            cy.getByAriaLabel(containerLabel).find(`[aria-label='Select ${selectTitle}']`).click();
            cy.getByAriaLabel(containerLabel).find(`[aria-label='${itemTitle}']`).click();
        } else {
            cy.getByAriaLabel(`Select ${selectTitle}`).click();
            cy.getByAriaLabel(itemTitle).click()
        }        
    }

    static textInput(label: string, text: string) {
        cy.getByAriaLabel(label).focus().type('{enter}').clear();
        cy.getByAriaLabel(label).focus().type(text);
    }
}