describe('Footer', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display footer links', () => {
    cy.get('footer')
      .find('a')
      .should('have.length', 6)
      .should('contain', 'About')
      .should('contain', 'Shop')
      .should('contain', 'Blog')
      .should('contain', 'Contact Us')
      .should('contain', 'Terms')
      .should('contain', 'Privacy');
  });

  it('should display copyright information', () => {
    cy.get('footer')
      .find('p')
      .should('have.text', '© 2023 Hopeful Harvest. All rights reserved.');
  });
});
