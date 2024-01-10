import {
  Then,
  Given,
  Before,
  When,
} from '@badeball/cypress-cucumber-preprocessor';

Cypress.Commands.add('login', () => {
  cy.visit('/');
  // cy.get('#username').type('hyperslap');
});

Before(() => {
  cy.login();
  cy.visit('/');
});

Given('No error is present', () => {
  cy.get('h2').should('not.include.text', 'Unexpected Application Error!');
});

When('I navigate in the application', () => {
  cy.visit('/');
});

Given('I am on the home page', () => {
  cy.visit('/');
});

Then(
  'I should see links to "About", "Shop", "Blog", "Contact Us", "Terms & privacy" in the footer',
  () => {
    cy.get('#about-link').should('exist');
    cy.get('#shop-link').should('exist');
    cy.get('#blog-link').should('exist');
    cy.get('#contact-link').should('exist');
    cy.get('#terms-link').should('exist').click();
  }
);

Then('I should see the copyright information in the footer', () => {
  cy.get('#terms-link').should('exist');
});

// Given i am on ht e home page
// when  i click och terms
// then a modal shoud show up
