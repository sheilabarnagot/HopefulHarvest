import {
  Given,
  When,
  Then,
  Before,
} from '@badeball/cypress-cucumber-preprocessor';

Cypress.Commands.add('login', () => {
  cy.visit('/login');
  cy.get('#username').type('hyperslap');
  cy.get('#password').type('1234');
  cy.get('#login-button').click();
});

Before(() => {
  cy.login();
});

Given('I am on the product page', () => {
  Cypress.config('defaultCommandTimeout', 100000);
  cy.visit('/shop');
});

When('I add an item to the cart', () => {
  cy.get('#add-item').click();
});

Then(
  'the number on the shopping cart icon should increase correspondingly',
  () => {
    cy.get('#shopping-icon').should('have.text', '1');
  }
);

Given('I have items in my cart', () => {
  cy.visit('/shop');
  cy.get('#add-item').click();
});

When('I remove an item from the cart', () => {
  cy.get('#remove-item').click();
});

Then(
  'the number on the shopping cart icon should decrease correspondingly',
  () => {
    cy.get('#shopping-icon').should('have.text', '0');
  }
);
