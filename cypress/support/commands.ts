// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload';

/// <reference types="cypress" />


Cypress.Commands.add('getByAriaLabel', { prevSubject: 'optional'}, (subject, ariaLabel: string) => {  
	if (subject) {
		cy.find(`[aria-label="${ariaLabel}"]`);
	} else {
		cy.get(`[aria-label="${ariaLabel}"]`);
	}
});


Cypress.Commands.add('getByAriaLabelStart', { prevSubject: 'optional'}, (subject, ariaLabel: string) => {  
	if (subject) {
		cy.find(`[aria-label^="${ariaLabel}"]`);
	} else {
		cy.get(`[aria-label^="${ariaLabel}"]`);
	}
});


Cypress.Commands.add('getByTestID', { prevSubject: 'optional'}, (subject, testID: string) => {  
	if (subject) {
		cy.find(`[data-testid="${testID}"]`)
	} else {
		cy.get(`[data-testid="${testID}"]`)
	}
});


Cypress.Commands.add('getByTestIDStart', { prevSubject: 'optional'}, (subject, testID: string) => {  
	if (subject) {
		cy.find(`[data-testid^="${testID}"]`)
	} else {
		cy.get(`[data-testid^="${testID}"]`)
	}
});


declare global {
    namespace Cypress {
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
        }
    }
}