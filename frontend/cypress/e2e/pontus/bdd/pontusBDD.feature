Feature: Profile page
  As a user,
  I want to be able to edit my information on the profile page,
  So that I can keep my details up-to-date.


Scenario: Editing user information on the profile page
  Given No error is present
  And A heading with the text "hello" is displayed
  And I am on the profile page
  When I click the "Edit User Information" button
  Then a modal should open for editing user information
  Then the modal should close

Scenario: Error handling when editing user information
  Given I'm still on the profile page
  Given The modal opens when i click the "Edit User" button
  Given I enter invalid information in the modal form
  When I submit invalid information in the modal form
  Then form should display error messages if not validated

