/// <reference types="cypress" />

describe('Initial Load', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/');
  });

  it('check if the title is visible', () => {
    cy.title().should('eq', 'dev.finance$');
  });

  it('check if the header is visible', () => {
    cy.get('header > img').should('be.visible');
  });

  it('all cards have been rendered', () => {
    cy.get('.entrada, .saida, .total').should('be.visible');
  });

  it('Checks if the add transaction button is visible and clickable', () => {
    cy.get('#transacao > .button').should('be.visible').click();
  });

  it('check if the table its clear on initial load', () => {
    cy.get('tbody').find('tr').should('have.length', 0);
  });

  it('check if the footer its visible', () => {
    cy.get('footer').should('be.visible');
  });
});
