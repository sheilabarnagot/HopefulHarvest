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
    'exist',
    `Registration and Login: By registering on our website, you agree
    to provide accurate and complete information. You are responsible
    for maintaining the confidentiality of your account and password.
    You must not share your login credentials with third parties.
    Notify us immediately if you suspect that your account has been
    compromised.`
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
