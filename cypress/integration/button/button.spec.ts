describe("Button", () => {


    it("Opens Button", () => {
        cy.visit("http://localhost:3000");

        cy.getByAriaLabel("Buttons expand button").click();

        cy.getByAriaLabel("Button").click();

        cy.get("main").find(".vieolo-button");
    })

})