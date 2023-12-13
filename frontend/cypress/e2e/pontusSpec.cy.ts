describe('Navigate to dashboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/dashboard');
  });
  it('Url contains dashboard', () => {
    cy.url().should('include', '/dashboard');
  });
});

describe('Testing if drawers open and closes', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/dashboard');
  });
  it('Close & open dashboard drawer', () => {
    cy.get('#drawer-close-button').click();
    cy.get('#open-dashboard-drawer').click();
  });
  it('Open & close upload drawer', () => {
    cy.get('.upload-product-button').click();
    cy.get('.cancel-upload-button').click();
    cy.get('#open-dashboard-drawer').click();
  });
});

describe('Testing if the upload button works', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/profile');
  });
  it('Upload button works', () => {
    cy.get('.upload-product-button').click();
    cy.get('.cancel-upload-button').click();
  });
});
