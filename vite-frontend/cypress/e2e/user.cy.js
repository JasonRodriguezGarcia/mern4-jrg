describe('UserList Component', () => {
//   it('displays an h1 with "User List"', () => {
//     cy.visit('/'); // Adjust if UserList is on another route
//     cy.get('h1').contains('User List');
//   });

  it('displays a text component with "Second test"', () => {
    cy.visit('/'); // Adjust if UserList is on another route
    cy.get('[data-testid="page-title"]').should('have.text', 'Second test');
  });


});