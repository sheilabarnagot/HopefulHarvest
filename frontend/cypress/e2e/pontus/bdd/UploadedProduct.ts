import {
  When,
  Then,
  Given,
  Before,
} from '@badeball/cypress-cucumber-preprocessor';
import 'cypress-file-upload';
Cypress.Commands.add('login', () => {
  cy.visit('/login');
  cy.get('#username').type('hyperslap');
  cy.get('#password').type('1234');
  cy.get('#login-button').click();
});

Before(() => {
  cy.visit('/login');
  cy.get('#username').type('hyperslap');
  cy.get('#password').type('1234');
  cy.get('#login-button').click();
});

Given('a user has uploaded products', () => {
  cy.wait(500); // utan detta kraschar testet
  cy.visit('/dashboard');

  cy.get('.upload-product-button').click();

  cy.get('#edit-user-product_name').type('Test Product');
  cy.get('#edit-user-price').type('100');
  cy.get('#edit-user-stock_quantity').type('100');
  cy.get('#edit-user-description').type('Test Description');
  cy.get('input[type="file"]').attachFile('fixtures/musical_elephant.jpeg');

  cy.get('#post-product-form').click();
});
When('the user navigates to their product page', () => {
  cy.get('.cancel-upload-button').click();
  cy.get('#open-dashboard-drawer').click();
  cy.get('.nav-upload-menu-item').click();
});

Then('the user should see a list of their uploaded products', () => {
  cy.wait(500); // utan detta kraschar testet
  cy.visit('/dashboard');
  cy.get('.nav-upload-menu-item').click();
  cy.get('h2').should('contain', 'My products');
  cy.get('.product-card').should('exist');
});
