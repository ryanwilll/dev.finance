/// <reference types="cypress" />

Cypress.Commands.add('fillTheForm', (description, value, date) => {
  cy.get('#transacao > .button').click();
  cy.get('#descricao').invoke('val', description);
  cy.get('#valor').invoke('val', value);
  cy.get('#data').invoke('val', date);
  cy.get('.confirmar').click();
});
