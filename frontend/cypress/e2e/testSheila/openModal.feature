Feature: Information Modal for Terms and Privacy
  As a user,
  I want to view informative text about terms and privacy in a modal,
  So that I can understand the policies of the website.

Scenario: Viewing Terms Information
  Given I am on the home page
  When I click on the "Terms" link in the footer
  Then a modal should open displaying information about the terms

  Given I am on the home page
  When I click on the "Privacy" link in the footer
  Then a modal should open displaying information about the privacy policy
