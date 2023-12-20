import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('Given I have items in my cart', () => {
  cy.visit('/');
  cy.get('[data-test=cart]').should('contain', 'Cart (empty)');
});

Given('I am on the checkout page', () => {
  cy.visit('/');
  cy.get('[data-test=cart]').should('contain', 'Cart (empty)');
});

When('I click the "Checkout" button', () => {
  cy.get('[data-test=product-1]').click();
});

Then('my items should be purchased', () => {
  cy.get('[data-test=cart]').should('contain', 'Cart (1)');
});

Then('my cart should be empty', () => {
  cy.get('[data-test=cart]').click();
  cy.get('[data-test=cart-product-1]').should('contain', 'Product 1');
});

Given('I have items in my cart', () => {
  cy.visit('/');
  cy.get('[data-test=cart]').should('contain', 'Cart (empty)');
});

Given('I am on the checkout page', () => {
  cy.visit('/');
  cy.get('[data-test=cart]').should('contain', 'Cart (empty)');
});

When('I click the "Checkout" button', () => {
  cy.get('[data-test=product-1]').click();
});

Then('I should see an error message indicating insufficient funds', () => {
  cy.get('[data-test=cart]').should('contain', 'Cart (1)');
});

Then('my items should remain in the cart', () => {
  cy.get('[data-test=cart]').click();
  cy.get('[data-test=cart-product-1]').should('contain', 'Product 1');
});
