Feature: Open Drawer
  As a user,
  I want to be abole to open the Drawer
  So that I can navigate around different features

Scenario: Open Drawer 
  Given I am logged in
  And I am on the dashboard page
  When I click on the drawer button
  Then I should see the drawer
