"use strict";
/// <reference types="cypress" />
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Cypress.Commands.add('hasInputValue', { prevSubject: true }, (subject, value) => {
    cy.get(subject.selector).should('have.value', value);
});
Cypress.Commands.add('assertInputInErrorMode', { prevSubject: true }, (subject, expectedColor) => {
    Promise.resolve().then(() => __importStar(require("./constants"))).then((c) => {
        cy.get(subject.selector).should('have.css', 'border-color').and('eq', expectedColor || c.E2EColors.ERROR_COLOR_NORMAL);
    });
});
Cypress.Commands.add('assertTextColor', { prevSubject: true }, (subject, expectedColor) => {
    cy.get(subject.selector).should('have.css', 'color').and('eq', expectedColor);
    Promise.resolve().then(() => __importStar(require("./constants"))).then((c) => {
    });
});
Cypress.Commands.add('assertTextWithErrorColor', { prevSubject: true }, (subject, expectedColor) => {
    Promise.resolve().then(() => __importStar(require("./constants"))).then((c) => {
        cy.get(subject.selector).should('have.css', 'color').and('eq', expectedColor || c.E2EColors.ERROR_COLOR_NORMAL);
    });
});
Cypress.Commands.add('assertTextWithSuccessColor', { prevSubject: true }, (subject, expectedColor) => {
    Promise.resolve().then(() => __importStar(require("./constants"))).then((c) => {
        cy.get(subject.selector).should('have.css', 'color').and('eq', expectedColor || c.E2EColors.SUCCESS_COLOR_NORMAL);
    });
});
