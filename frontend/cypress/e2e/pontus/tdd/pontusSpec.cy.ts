Cypress.Commands.add('login', () => {
  cy.visit('/login');
  cy.get('#username').type('hyperslap');
  cy.get('#password').type('1234');
  cy.get('#login-button').click();
});

describe('Navigate to dashboard', () => {
  beforeEach(() => {
    cy.login();
  });
  it('Url contains dashboard', () => {
    cy.visit('/login');
    cy.get('#username').type('hyperslap');
    cy.get('#password').type('1234');
    cy.get('#login-button').click();
    cy.visit('/dashboard');
    cy.url().should('include', '/dashboard');
  });
});

describe('Testing if drawers open and closes', () => {
  beforeEach(() => {
    cy.login();
  });
  it('Close & open dashboard drawer', () => {
    cy.visit('/dashboard');
    cy.get('#open-dashboard-drawer').click();
    cy.get('#drawer-close-button').click();
  });
  it('Open & close upload drawer', () => {
    cy.visit('/dashboard');
    cy.get('#open-dashboard-drawer').click();
    cy.get('.upload-product-button').click();
    cy.get('.cancel-upload-button').click();
  });
});

describe('Testing if the upload button works', () => {
  beforeEach(() => {
    cy.login();
  });
  it('Upload button works', () => {
    cy.visit('/dashboard');
    cy.get('#open-dashboard-drawer').click();
    cy.get('.upload-product-button').click();
    cy.get('.cancel-upload-button').click();
  });
});
