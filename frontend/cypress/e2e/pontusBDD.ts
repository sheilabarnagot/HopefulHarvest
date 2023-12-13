import {
  When,
  Then,
  Given,
  Before,
} from '@badeball/cypress-cucumber-preprocessor';

Before(() => {
  cy.visit('http://localhost:5173/profile/users/1');
  cy.url().should('include', '/profile');
});

// Editing user information on the profile page //

Given('No error is present', () => {
  cy.get('h2').should('not.include.text', 'Unexpected Application Error!'); // react router dom default error msg.
});

Given('A heading with the text "hello" is displayed', () => {
  cy.get('h2').should('include.text', 'hello');
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
  cy.location().should(loc => {
    expect(loc.pathname).to.eq('/profile/users/1');
  });
});

Given('The modal opens when i click the "Edit User" button', () => {
  cy.get('#edit-user-info-button').click();
});

Given('I enter invalid information in the modal form', () => {
  cy.get('#edit-user-email').type('invalid email'); // email format is wrong.
  cy.get('#edit-user-username').type('test'); // name cant be the same that already exist.
});

When('I submit invalid information in the modal form', () => {
  cy.get('#edit-user-profile-form').submit();
});

Then('an error message should be displayed in a toast', () => {
  cy.get('#toast-error').should('include.text', 'Invalid email format');
});
Then('form should display error messages if not validated', () => {
  cy.get('#edit-user-email-error').should(
    'include.text',
    'Invalid email format'
  );
  cy.get('#edit-user-username-error').should(
    'include.text',
    'You already have a user with that name'
  );
});

////////////////////////////////////////////////////////
