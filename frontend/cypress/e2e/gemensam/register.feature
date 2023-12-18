Feature: Register page

As a user I want to be able to create an account.

Scenario: User is on the register page and want to register an account

Given I am in the register page
Given I should be able to write my personal data
When form is submitted
Then I should be register
Then I should be redirected to login page
