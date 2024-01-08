import {
  When,
  Then,
  Given,
  Before,
} from '@badeball/cypress-cucumber-preprocessor';

Before(() => {
  cy.visit('/register');
});

Given('I am in the register page', () => {
  cy.url().should('include', '/register');
});

Given('I should be able to write my personal data', () => {
  cy.get('#firstName').type('Sheila');
  cy.get('#lastname').type('Martinez');
  cy.get('#username').type('Sheilaaaa');
  cy.get('#email').type('sheilaa@gmail.com');
  cy.get('#password').type('Onfire2023');
  cy.get('#address').type('Göteborg');
  cy.get('#passphone_numberword').type('0761234556');
});

When('form is submitted', () => {
  cy.get('form').submit();
});

Then('I should be register', () => {
  cy.url().should('not.include', '/register');
});

Then('I should be redirected to login page', () => {
  cy.url().should('include', '/login');
});
