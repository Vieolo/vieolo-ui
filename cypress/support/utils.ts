export class LocalServer {
    static start(groupName?: string, itemTitle?: string) {
        cy.visit('http://localhost:3000');
        if(groupName){
            cy.getByAriaLabel(`${groupName} expand button`).click();
            cy.getByAriaLabel(itemTitle).click();
        }
    }
}