import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am on the product page', () => {
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
    cy.get('#shopping-icon').should('have.text', 'expected-number');
  }
);
