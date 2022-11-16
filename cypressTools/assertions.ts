// Installed Packages
import VDate from '@vieolo/date'

export default class Assertions {
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