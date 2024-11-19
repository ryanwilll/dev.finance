describe('Create Entry', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/');
  });

  it('create new entry', () => {
    cy.fillTheForm('Salário', 2500, '2024-11-11');
    cy.get('tbody').find('tr').should('have.length', 1),
      cy.get('tr td.descricao').should('have.text', 'Salário');
    cy.get('tr td.entrada').should('contain.text', '2.500,00');
    cy.get('tr td.data').should('have.text', '11/11/2024');
    cy.get('#total').should('contain.text', '2.500,00');

    cy.get('#entradasDisplay')
      .should('contain.text', '2.500,00')
      .and('not.have.text', '');
  });

  it('create a new entry without all required fields', () => {
    cy.fillTheForm('Salário', '', '2024-11-11');
    cy.on('window:alert', (t) => {
      expect(t).to.contains('Por favor, preencha todos os campos');
    });
  });
});

describe('create a expense', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/');
  });

  it('create new expense', () => {
    cy.fillTheForm('Alimentação', 1200, '2024-11-11');
    cy.get('tbody').find('tr').should('have.length', 1),
      cy.get('tr td.descricao').should('have.text', 'Alimentação');
    cy.get('tr td.entrada').should('contain.text', '1.200,00');
    cy.get('tr td.data').should('have.text', '11/11/2024');
    cy.get('#total').should('contain.text', '1.200,00');

    cy.get('#entradasDisplay')
      .should('contain.text', '1.200,00')
      .and('not.have.text', '');
  });
});
