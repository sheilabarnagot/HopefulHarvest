describe('Footer component', () => {
  it('displays copyright text', () => {
    cy.visit('/'); // Footer in the home page
    cy.get('footer').should('contain', 'Copyright © 2023');
  });
});
