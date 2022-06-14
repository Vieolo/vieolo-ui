// Installed Packages
import VDate from '@vieolo/date';
// import { ERROR_COLOR_NORMAL, SUCCESS_COLOR_NORMAL } from './constants';

export class Assertions {
    static assertInputInErrorMode(selector: string) {
        cy.get(selector).should('have.css', 'border-color').and('eq', 'rgb(245, 0, 87)');
    }

    static assertInputInNormalMode(selector: string) {
        cy.get(selector).should('have.css', 'border-color').and('eq', 'rgb(242, 242, 242)');
    }    

    static assertURLPath(path: string) {
        let finalPath = path;
        if (finalPath[0] !== "/") finalPath = `/${finalPath}`;
        cy.location().its('pathname').should('eq', finalPath);
    }

    static assertDatePickerSelectedDate(label: string, expectedDate: VDate | string) {
        cy.getByAriaLabel(`${label} button`).contains((typeof expectedDate === 'string' ? new VDate(expectedDate) : expectedDate).formatDate('dd/mm/yyyy'))
    }
}

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

export class LocalServer {
    static start(groupName?: string, itemTitle?: string) {
        cy.visit('http://localhost:3000');
        if(groupName){
            cy.getByAriaLabel(`${groupName} expand button`).click();
            cy.getByAriaLabel(itemTitle).click();
        }
    }
}