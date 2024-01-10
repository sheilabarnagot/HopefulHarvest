describe('Footer', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display footer links', () => {
    cy.get('footer')
      .find('a')
      .should('have.length', 4)
      .invoke('text')
      .should('include', 'About')
      .should('include', 'Shop')
      .should('include', 'Blog')
      .should('include', 'Contact Us')
      // .should(':contain', 'Terms & privacy')
  });

  it('should display copyright information', () => {
    cy.get('footer')
      .find('p')
      .should('have.text', '© 2023 Hopeful Harvest. All rights reserved.');
  });
});
