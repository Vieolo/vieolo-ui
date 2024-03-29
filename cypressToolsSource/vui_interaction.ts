// Installed Packages
import VDate from '@vieolo/vdate'

export default class VieoloUIInteraction {
    static GANTT_ROW_CLASS = '.vieolo-gantt-chart__content-div__row';

    static selectDateFromDateTimePicker(label: string, targetDate: VDate | string, time?: string) {
        cy.get(`[aria-label='${label} Date button']`).focus().type('{enter}');
    
        cy.get(`[aria-label='${label} Date Search Date']`).focus().type(`${(typeof targetDate === 'string' ? new VDate(targetDate) : targetDate).formatDate('dd/mm/yyyy')}{enter}`);

        if (time) {
            cy.getByAriaLabel(`${label} Time`).clear().type(time)
        }
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

    static selectOptionFromSelect(options: {
        containerLabel?: string,
        selectTitle?: string,
        ariaLabel?: string,
        itemTitle: string
    }) {
        if (options.containerLabel) {
            cy.getByAriaLabel(options.containerLabel).find(`[aria-label='${options.ariaLabel || `Select ${options.selectTitle || ''}`}']`).click();
            cy.getByAriaLabel(options.containerLabel).find(`[aria-label='${options.itemTitle}']`).click();
        } else {
            cy.getByAriaLabel(options.ariaLabel || `Select ${options.selectTitle || ''}`).click();
            cy.getByAriaLabel(options.itemTitle).click()
        }        
    }

    static textInput(label: string, text: string) {
        cy.getByAriaLabel(label).focus().type('{enter}').clear();
        cy.getByAriaLabel(label).focus().type(text);
    }
}