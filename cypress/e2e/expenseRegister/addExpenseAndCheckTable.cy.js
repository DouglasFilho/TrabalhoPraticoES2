describe('Expense Management', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Adding a new expense and displaying it in the list', () => {
    cy.get('[data-cy=expense-name-input]', { timeout: 10000 }).should('be.visible');

    cy.get('[data-cy=expense-name-input]').type('New Laptop'); // Input do nome da despesa
    cy.get('[data-cy=expense-amount-input]').type('1500'); // Input do valor
  
    cy.get('[data-cy=expense-category-select]').click();

    cy.get('.q-menu').should('be.visible');

    cy.get('.q-item')
      .contains('Alimentação')
      .click();
    
    cy.get('[data-cy=add-expense-button]').click();

    cy.get('table.q-table').should('contain', 'New Laptop');
  });

  it('Adding expenses and displaying it in the list using filter name', () => {
    cy.get('[data-cy=expense-name-input]', { timeout: 10000 }).should('be.visible');

    cy.get('[data-cy=expense-name-input]').type('New Laptop'); // Input do nome da despesa
    cy.get('[data-cy=expense-amount-input]').type('1500'); // Input do valor
  
    cy.get('[data-cy=expense-category-select]').click();

    cy.get('.q-menu').should('be.visible');

    cy.get('.q-item')
      .contains('Lazer')
      .click();
    
    cy.get('[data-cy=add-expense-button]').click();

    cy.get('table.q-table').should('contain', 'New Laptop');

    cy.get('[data-cy=expense-name-input]').type('New game'); // Input do nome da despesa
    cy.get('[data-cy=expense-amount-input]').type('1500'); // Input do valor
  
    cy.get('[data-cy=expense-category-select]').click();

    cy.get('.q-menu').should('be.visible');

    cy.get('.q-item')
      .contains('Lazer')
      .click();
    
    cy.get('[data-cy=add-expense-button]').click();

    cy.get('table.q-table').should('contain', 'New game');

    cy.get('[data-cy=expense-list-name-filter]').type('invalid name');
    cy.get('table.q-table').should('not.contain', 'New game');
    cy.get('table.q-table').should('not.contain', 'New Laptop');
  });

  it('Adding expenses and displaying it in the list using filter category', () => {
    cy.get('[data-cy=expense-name-input]', { timeout: 10000 }).should('be.visible');

    cy.get('[data-cy=expense-name-input]').type('Ifood'); // Input do nome da despesa
    cy.get('[data-cy=expense-amount-input]').type('200'); // Input do valor
  
    cy.get('[data-cy=expense-category-select]').click();

    cy.get('.q-menu').should('be.visible');

    cy.get('.q-item')
      .contains('Alimentação')
      .click();
    
    cy.get('[data-cy=add-expense-button]').click();

    cy.get('table.q-table').should('contain', 'Ifood');

    cy.get('[data-cy=expense-name-input]').type('New game'); // Input do nome da despesa
    cy.get('[data-cy=expense-amount-input]').type('1500'); // Input do valor
  
    cy.get('[data-cy=expense-category-select]').click();
    cy.get('.q-menu').should('be.visible');
    cy.get('.q-item')
      .contains('Lazer')
      .click();
    
    cy.get('[data-cy=add-expense-button]').click();

    cy.get('table.q-table').should('contain', 'New game');

    cy.get('[data-cy=expense-list-category-filter]').click();
    cy.get('.q-menu').should('be.visible');
    cy.get('.q-item')
    .contains('Lazer')
    .click();

    cy.get('table.q-table').should('not.contain', 'Ifood');
    cy.get('table.q-table').should('not.contain', 'New Laptop');
  });
});

