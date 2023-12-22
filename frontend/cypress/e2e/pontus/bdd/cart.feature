Feature: Cart Checkout
  As a user,
  I want to be able to checkout items in my cart,
  So that I can purchase my selected items.

Scenario: Successful checkout
  Given I have items in my cart
  And I am on the checkout page
  When I click the "Checkout" button
  Then my items should be purchased
  And my cart should be empty

