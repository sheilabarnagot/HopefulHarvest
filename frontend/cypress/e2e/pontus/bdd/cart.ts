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
  cy.wait(1000);
});

Before(() => {
  cy.login();
});

Given('I have items in my cart', () => {
  cy.wait(1000);
  cy.visit('/shop');
  cy.get('#add-item').click();
  cy.visit('/checkout');
  cy.get('#items-in-cart').should('contain', '1');
});

Given('I am on the checkout page', () => {
  cy.visit('/checkout');
});

When('I click the "Checkout" button', () => {
  cy.get('#checkout-button').click();
});

Then('my items should be purchased', () => {
  cy.get('#cart-item').should('not.exist');
});

Then('my cart should be empty', () => {
  cy.get('#items-in-cart').should('contain', '0');
});
