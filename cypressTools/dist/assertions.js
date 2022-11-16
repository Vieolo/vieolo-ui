"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Installed Packages
const date_1 = __importDefault(require("@vieolo/date"));
class Assertions {
    static assertInputInErrorMode(selector) {
        cy.get(selector).should('have.css', 'border-color').and('eq', 'rgb(245, 0, 87)');
    }
    static assertInputInNormalMode(selector) {
        cy.get(selector).should('have.css', 'border-color').and('eq', 'rgb(242, 242, 242)');
    }
    static assertURLPath(path) {
        let finalPath = path;
        if (finalPath[0] !== "/")
            finalPath = `/${finalPath}`;
        cy.location().its('pathname').should('eq', finalPath);
    }
    static assertDatePickerSelectedDate(label, expectedDate) {
        cy.getByAriaLabel(`${label} button`).contains((typeof expectedDate === 'string' ? new date_1.default(expectedDate) : expectedDate).formatDate('dd/mm/yyyy'));
    }
}
exports.default = Assertions;
