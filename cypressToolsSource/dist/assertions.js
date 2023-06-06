"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Constants
const constants_1 = require("./constants");
// Installed Packages
const vdate_1 = __importDefault(require("@vieolo/vdate"));
class Assertions {
    static assertInputInErrorMode(selector, expectedColor) {
        cy.get(selector).should('have.css', 'border-color').and('eq', expectedColor || constants_1.E2EColors.ERROR_COLOR_NORMAL);
    }
    static assertInputInNormalMode(selector, expectedColor) {
        cy.get(selector).should('have.css', 'border-color').and('eq', expectedColor || constants_1.E2EColors.NEUTRAL_COLOR);
    }
    static assertURLPath(path) {
        let finalPath = path;
        if (finalPath[0] !== "/")
            finalPath = `/${finalPath}`;
        cy.location().its('pathname').should('eq', finalPath);
    }
    static assertDatePickerSelectedDate(label, expectedDate) {
        cy.getByAriaLabel(`${label} button`).contains((typeof expectedDate === 'string' ? new vdate_1.default(expectedDate) : expectedDate).formatDate('dd/mm/yyyy'));
    }
    static assertSnackbar(options) {
        let snackbar = cy.get(".snackbar");
        let targetBackgroundColor = "";
        if (options.type === 'error') {
            targetBackgroundColor = options.expectedColor || constants_1.E2EColors.ERROR_COLOR_NORMAL;
        }
        else if (options.type === 'success') {
            targetBackgroundColor = options.expectedColor || constants_1.E2EColors.SUCCESS_COLOR_NORMAL;
        }
        snackbar.should('have.css', 'background-color').and('eq', targetBackgroundColor);
        cy.get(".snackbar").contains(options.message);
        if (options.clickOnActionAfterAssert) {
            cy.get(".snackbar").children('button').click();
        }
    }
}
exports.default = Assertions;
