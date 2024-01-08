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

Given('I am logged in', () => {
  cy.visit('/dashboard');
});

Given('I am on the dashboard page', () => {
  cy.get('#dashboard-welcome').should('contain', 'hi hyperslap');
});

When('I click on the drawer button', () => {
  cy.get('#open-dashboard-drawer').click();
});

Then('I should see the drawer', () => {
  cy.get('#dashboard-drawer').should('be.visible');
});
