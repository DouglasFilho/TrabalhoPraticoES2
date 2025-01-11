describe('Expense Management', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Adding a new expense and displaying it in the card', () => {
    cy.get('[data-cy=expense-name-input]', { timeout: 10000 }).should('be.visible');

    cy.get('[data-cy=expense-name-input]').type('New Laptop'); // Input do nome da despesa
    cy.get('[data-cy=expense-amount-input]').type('1500'); // Input do valor
  
    cy.get('[data-cy=expense-category-select]').click();

    cy.get('.q-menu').should('be.visible');

    cy.get('.q-item')
      .contains('Alimentação')
      .click();
    
    cy.get('[data-cy=add-expense-button]').click();

    cy.get('[data-cy=expense-card-total]').should('be.visible');
  });

  it('Adding a new expense and add the total price in the card', () => {
    cy.get('[data-cy=expense-name-input]', { timeout: 10000 }).should('be.visible');

    cy.get('[data-cy=expense-name-input]').type('New shoe'); // Input do nome da despesa
    cy.get('[data-cy=expense-amount-input]').type('1500'); // Input do valor
  
    cy.get('[data-cy=expense-category-select]').click();

    cy.get('.q-menu').should('be.visible');

    cy.get('.q-item')
      .contains('Alimentação')
      .click();
    
    cy.get('[data-cy=add-expense-button]').click();

    cy.get('[data-cy=expense-name-input]').type('New car'); // Input do nome da despesa
    cy.get('[data-cy=expense-amount-input]').type('1500'); // Input do valor
  
    cy.get('[data-cy=expense-category-select]').click();

    cy.get('.q-menu').should('be.visible');

    cy.get('.q-item')
      .contains('Alimentação')
      .click();
    
    cy.get('[data-cy=add-expense-button]').click();

    cy.get('[data-cy=expense-card-total]').should('be.visible');
    cy.get('[data-cy=expense-card-total]').should('contain', 'Total: R$ 3000.00');

  });

  it('Adding a new expense and update de percentage', () => {
    cy.get('[data-cy=expense-name-input]', { timeout: 10000 }).should('be.visible');

    cy.get('[data-cy=expense-name-input]').type('New shoe'); // Input do nome da despesa
    cy.get('[data-cy=expense-amount-input]').type('1500'); // Input do valor
  
    cy.get('[data-cy=expense-category-select]').click();

    cy.get('.q-menu').should('be.visible');

    cy.get('.q-item')
      .contains('Alimentação')
      .click();
    
    cy.get('[data-cy=add-expense-button]').click();

    cy.get('[data-cy=expense-name-input]').type('New car'); // Input do nome da despesa
    cy.get('[data-cy=expense-amount-input]').type('1500'); // Input do valor
  
    cy.get('[data-cy=expense-category-select]').click();

    cy.get('.q-menu').should('be.visible');

    cy.get('.q-item')
      .contains('Lazer')
      .click();
    
    cy.get('[data-cy=add-expense-button]').click();

    cy.get('[data-cy=expense-card-percentage]').should('contain', 'Porcentagem do total: 50.00%');

  });
});
