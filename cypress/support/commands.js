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

Cypress.Commands.add('login', (email, pwd) => {
    cy.get('[placeholder="Email"]').type(email);
    cy.get('[placeholder="Password"]').type(pwd);
    cy.get('button[type="submit"]').click();
})

Cypress.Commands.add('signup',(nickname,email,pwd)=>{
    cy.get('[placeholder="Nickname"]').type(nickname).should('have.value', nickname);
    cy.get('[placeholder="Email"]').type(email).should('have.value', email);
    cy.get('[placeholder="Password"]').type(pwd).should('have.value', pwd);
    cy.get('button[type="submit"]').click();
});
