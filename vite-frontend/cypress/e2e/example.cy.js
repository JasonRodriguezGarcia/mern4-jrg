describe('My First Test', () => {
  it('Visits the app and checks the title', () => {
    cy.visit('/');
    cy.title().should('eq', 'Vite + React');
  });

  it('Visits the app and checks that Hola exists', () => {
    cy.visit('/');
    cy.get('h1').contains('Hola');
  });

});