// Constants
import { E2EColors } from './constants';

// Installed Packages
import VDate from '@vieolo/date'

export default class Assertions {
    static assertInputInErrorMode(selector: string, expectedColor?: string) {
        cy.get(selector).should('have.css', 'border-color').and('eq', expectedColor || E2EColors.ERROR_COLOR_NORMAL);
    }

    static assertInputInNormalMode(selector: string, expectedColor?: string) {
        cy.get(selector).should('have.css', 'border-color').and('eq', expectedColor ||E2EColors.NEUTRAL_COLOR);
    }    

    static assertURLPath(path: string) {
        let finalPath = path;
        if (finalPath[0] !== "/") finalPath = `/${finalPath}`;
        cy.location().its('pathname').should('eq', finalPath);
    }

    static assertDatePickerSelectedDate(label: string, expectedDate: VDate | string) {
        cy.getByAriaLabel(`${label} button`).contains((typeof expectedDate === 'string' ? new VDate(expectedDate) : expectedDate).formatDate('dd/mm/yyyy'))
    }

    static assertSnackbar(options: {
        type: 'error' | 'success' | 'info',
        message: string,
        clickOnActionAfterAssert?: boolean,
        expectedColor?: string
    }) {
        let snackbar = cy.get(".snackbar");
    
        let targetBackgroundColor = "";
    
        if (options.type === 'error') {
            targetBackgroundColor = options.expectedColor || E2EColors.ERROR_COLOR_NORMAL
        } else if (options.type === 'success') {
            targetBackgroundColor = options.expectedColor ||E2EColors.SUCCESS_COLOR_NORMAL
        }
    
        snackbar.should('have.css', 'background-color').and('eq', targetBackgroundColor);
        cy.get(".snackbar").contains(options.message);
    
        if (options.clickOnActionAfterAssert) {
            cy.get(".snackbar").children('button').click();
        }
    }
}