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

Given('I have items in my cart', () => {
  cy.wait(500);
  cy.visit('/shop');
  cy.get('#add-item').click();
  cy.visit('/checkout');
  cy.get('#items-in-cart');
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

// --------------------------------------------------------

// Given('I have items in my cart', () => {
//   cy.wait(500);
//   cy.visit('/shop');
//   cy.get('#add-item').click();
//   cy.visit('/checkout');
//   cy.get('#items-in-cart');
// });

// Given('I am on the checkout page', () => {
//   cy.visit('/checkout');
// });

// When('I click the "Checkout" button', () => {
//   cy.get('#checkout-button').click();
// });

// Then('I should see an error message indicating insufficient funds', () => {
//   cy.get('[data-test=cart]').should('contain', 'Cart (1)');
// });

// Then('my items should remain in the cart', () => {
//   cy.get('[data-test=cart]').click();
//   cy.get('[data-test=cart-product-1]').should('contain', 'Product 1');
// });
