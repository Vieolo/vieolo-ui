/// <reference types="cypress" />
import VDate from '@vieolo/date';
export default class VieoloUIInteraction {
    static GANTT_ROW_CLASS: string;
    static selectDateFromDateTimePicker(label: string, targetDate: VDate | string): void;
    static selectDateFromDatePicker(label: string, targetDate: VDate | string): void;
    static ganttGetAllRow(): Cypress.Chainable<JQuery<HTMLElement>>;
    static ganttGetRowAt(index: number): Cypress.Chainable<JQuery<HTMLElement>>;
    static ganttdragRow(dragIndex: number, targetIndex: number, targetPosition: 'top' | 'bottom'): void;
    static selectOptionFromSelect(selectTitle: string, itemTitle: string, containerLabel?: string): void;
    static textInput(label: string, text: string): void;
}
