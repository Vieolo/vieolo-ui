/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        /**
         * Gets the element by its Aria Label
         * @param ariaLabel The full aria label of the element
         * @example cy.getByAriaLabel("something")
         */
        getByAriaLabel(ariaLabel: string): Chainable<Element>,

        /**
         * Gets the element by the start of its Aria Label
         * @param ariaLabel The starting of the aria label of the element
         * @example cy.getByAriaLabelStart("something")
         */
        getByAriaLabelStart(ariaLabel: string): Chainable<Element>,

        /**
        * Gets the element by its test ID
        * @param testID The full test id of the element
        * @example cy.getByTestID("something")
        */
        getByTestID(testID: string): Chainable<Element>,

        /**
        * Gets the element by the start of its test ID
        * @param testID The starting of the test id of the element
        * @example cy.getByTestIDStart("something")
        */
        getByTestIDStart(testID: string): Chainable<Element>,

        /**
         * Checks the backgound color of the element
         * @param backgroundColor Backgound color in RGB
         */
        hasBackgroundColor(backgroundColor: string): void,

        /**
         * Checks the border color of the element
         * @param borderColor Backgound color in RGB
         */
        hasBorderColor(borderColor: string): void,
        hasInputValue(value: string): Chainable<Element>,
        assertInputInErrorMode(expectedColor?: string): Chainable<Element>,
        assertTextColor(expectedColor: string): Chainable<Element>,
        assertTextWithErrorColor(expectedColor?: string): Chainable<Element>,
        assertTextWithSuccessColor(expectedColor?: string): Chainable<Element>,
    }
}



Cypress.Commands.add('getByAriaLabel', { prevSubject: 'optional' }, (subject, ariaLabel: string) => {
    if (subject) {
        cy.find(`[aria-label="${ariaLabel}"]`);
    } else {
        cy.get(`[aria-label="${ariaLabel}"]`);
    }
});


Cypress.Commands.add('getByAriaLabelStart', { prevSubject: 'optional' }, (subject, ariaLabel: string) => {
    if (subject) {
        cy.find(`[aria-label^="${ariaLabel}"]`);
    } else {
        cy.get(`[aria-label^="${ariaLabel}"]`);
    }
});


Cypress.Commands.add('getByTestID', { prevSubject: 'optional' }, (subject, testID: string) => {
    if (subject) {
        cy.find(`[data-testid="${testID}"]`)
    } else {
        cy.get(`[data-testid="${testID}"]`)
    }
});


Cypress.Commands.add('getByTestIDStart', { prevSubject: 'optional' }, (subject, testID: string) => {
    if (subject) {
        cy.find(`[data-testid^="${testID}"]`)
    } else {
        cy.get(`[data-testid^="${testID}"]`)
    }
});


Cypress.Commands.add('hasBackgroundColor', { prevSubject: true }, (subject, backgroundColor: string) => {
    if (subject) {
        cy.wrap(subject).should('have.css', 'background-color').and('eq', backgroundColor);
    }
});

Cypress.Commands.add('hasBorderColor', { prevSubject: true }, (subject, borderColor: string) => {
    if (subject) {
        cy.wrap(subject).should('have.css', 'border-color').and('eq', borderColor);
    }
});

Cypress.Commands.add('hasInputValue', { prevSubject: true }, (subject, value: string) => {
    cy.get(subject.selector).should('have.value', value);
});

Cypress.Commands.add('assertInputInErrorMode', { prevSubject: true }, (subject, expectedColor?: string) => {
    import("./constants").then((c) => {
        cy.get(subject.selector).should('have.css', 'border-color').and('eq', expectedColor || c.E2EColors.ERROR_COLOR_NORMAL);
    })
});

Cypress.Commands.add('assertTextColor', { prevSubject: true }, (subject, expectedColor: string) => {
    cy.get(subject.selector).should('have.css', 'color').and('eq', expectedColor);import("./constants").then((c) => {
        
    })
});

Cypress.Commands.add('assertTextWithErrorColor', { prevSubject: true }, (subject, expectedColor?: string) => {
    import("./constants").then((c) => {
        cy.get(subject.selector).should('have.css', 'color').and('eq', expectedColor || c.E2EColors.ERROR_COLOR_NORMAL);
    })
});

Cypress.Commands.add('assertTextWithSuccessColor', { prevSubject: true }, (subject, expectedColor?: string) => {
    import("./constants").then((c) => {
        cy.get(subject.selector).should('have.css', 'color').and('eq', expectedColor || c.E2EColors.SUCCESS_COLOR_NORMAL);
    })
});
