import {
  When,
  Then,
  Given,
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

// Editing user information on the profile page //

Given('No error is present', () => {
  cy.get('h2').should('not.include.text', 'Unexpected Application Error!'); // react router dom default error msg.
});

Given('A heading with the text "hello" is displayed', () => {
  cy.visit('/dashboard/profile/users/product-page');
  cy.get('h2').should('include.text', 'My products');
});

Given('I am on the profile page', () => {
  cy.get('#open-dashboard-drawer').click();
  cy.get('.profile-button').click();
});

When('I click the "Edit User Information" button', () => {
  cy.get('#edit-user-info-button').click();
});

Then('a modal should open for editing user information', () => {
  cy.get('#edit-user-profile-form').should('exist');
});
Then('the modal should close', () => {
  cy.get('#edit-user-modal-close').click();
});
////////////////////////////////////////////////////////

// Error handling when editing user information //

Given("I'm still on the profile page", () => {
  cy.get('#open-dashboard-drawer').click();
  cy.get('.profile-button').click();
});

Given('The modal opens when i click the "Edit User" button', () => {
  cy.get('#edit-user-info-button').click();
});

Given('I enter invalid information in the modal form', () => {
  cy.get('#edit-user-email').type('invalid email'); // email format is wrong.
  cy.get('#edit-user-email').clear();
  cy.get('#edit-user-username').type('h'); // name cant be the same that already exist.
  cy.get('.edit-user-modal-save').click();
});

When('I submit invalid information in the modal form', () => {
  cy.get('#edit-user-profile-form').submit();
});

Then('form should display error messages if not validated', () => {
  cy.get('#edit-user-email').type('invalid email');
  cy.get('#edit-user-email-error').should('exist');
  cy.get('#edit-user-username-error').should('exist');
  cy.get('#edit-user-username').clear();
  cy.get('#edit-user-email').clear();
  cy.get('#edit-user-username').type('hyperslap');
  cy.get('.edit-user-modal-save').click();
  cy.get('#edit-user-username-error')
    .should('exist')
    .contains('username is the same as before');
});

////////////////////////////////////////////////////////
