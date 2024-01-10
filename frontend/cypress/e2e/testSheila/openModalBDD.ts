import {
  Before,
  Given,
  When,
  Then,
} from '@badeball/cypress-cucumber-preprocessor';

Before(() => {
  cy.visit('/');
});

Given('I am on the home page', () => {
  cy.visit('/');
});

When('I click on the "Terms & privacy" link in the footer', () => {
  cy.get('#terms-link').click();
});

// When('I click on the "Privacy" link in the footer', () => {
//   cy.get('#privacy-link').click();
// });

Then('a modal should open displaying information about the terms', () => {
  cy.get('#terms-modal').should('exist');
  cy.get('#terms-modal-content').should(
    'contain.text',
    'Terms and conditions information'
  );
});

Then(
  'a modal should open displaying information about the privacy policy',
  () => {
    cy.get('#privacy-modal').should('exist');
    cy.get('#privacy-modal-content').should(
      'contain.text',
      'Privacy policy information'
    );
  }
);
