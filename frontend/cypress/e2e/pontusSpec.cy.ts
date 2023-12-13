describe('Navigate to dashboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/dashboard');
  });
  it('passes', () => {
    cy.url().should('include', '/dashboard');
  });
});
