"use strict";
/// <reference types="cypress" />
Cypress.Commands.add('getByAriaLabel', { prevSubject: 'optional' }, (subject, ariaLabel) => {
    if (subject) {
        cy.find(`[aria-label="${ariaLabel}"]`);
    }
    else {
        cy.get(`[aria-label="${ariaLabel}"]`);
    }
});
Cypress.Commands.add('getByAriaLabelStart', { prevSubject: 'optional' }, (subject, ariaLabel) => {
    if (subject) {
        cy.find(`[aria-label^="${ariaLabel}"]`);
    }
    else {
        cy.get(`[aria-label^="${ariaLabel}"]`);
    }
});
Cypress.Commands.add('getByTestID', { prevSubject: 'optional' }, (subject, testID) => {
    if (subject) {
        cy.find(`[data-testid="${testID}"]`);
    }
    else {
        cy.get(`[data-testid="${testID}"]`);
    }
});
Cypress.Commands.add('getByTestIDStart', { prevSubject: 'optional' }, (subject, testID) => {
    if (subject) {
        cy.find(`[data-testid^="${testID}"]`);
    }
    else {
        cy.get(`[data-testid^="${testID}"]`);
    }
});
Cypress.Commands.add('hasBackgroundColor', { prevSubject: true }, (subject, backgroundColor) => {
    if (subject) {
        cy.wrap(subject).should('have.css', 'background-color').and('eq', backgroundColor);
    }
});
Cypress.Commands.add('hasBorderColor', { prevSubject: true }, (subject, borderColor) => {
    if (subject) {
        cy.wrap(subject).should('have.css', 'border-color').and('eq', borderColor);
    }
});
