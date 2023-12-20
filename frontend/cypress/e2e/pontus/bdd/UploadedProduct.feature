Feature: Display User Uploaded Products

  As a user
  I want to see the products I have uploaded
  So that I can manage my products

  Scenario: User views their uploaded products
    Given a user has uploaded products
    When the user navigates to their product page
    Then the user should see a list of their uploaded products