declare namespace Cypress {
    interface Chainable {
        /**
         * Gets the element by its Aria Label
         * @param ariaLabel The full aria label of the element
         * @example cy.getByAriaLabel("something")
         */
        getByAriaLabel(ariaLabel: string): Chainable<Element>;
        /**
         * Gets the element by the start of its Aria Label
         * @param ariaLabel The starting of the aria label of the element
         * @example cy.getByAriaLabelStart("something")
         */
        getByAriaLabelStart(ariaLabel: string): Chainable<Element>;
        /**
        * Gets the element by its test ID
        * @param testID The full test id of the element
        * @example cy.getByTestID("something")
        */
        getByTestID(testID: string): Chainable<Element>;
        /**
        * Gets the element by the start of its test ID
        * @param testID The starting of the test id of the element
        * @example cy.getByTestIDStart("something")
        */
        getByTestIDStart(testID: string): Chainable<Element>;
        /**
         * Checks the backgound color of the element
         * @param backgroundColor Backgound color in RGB
         */
        hasBackgroundColor(backgroundColor: string): void;
        /**
         * Checks the border color of the element
         * @param borderColor Backgound color in RGB
         */
        hasBorderColor(borderColor: string): void;
    }
}
