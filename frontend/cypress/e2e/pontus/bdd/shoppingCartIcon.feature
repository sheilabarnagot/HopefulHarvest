Feature: Shopping Cart Icon
  As a user,
  I want to see the number of items in my cart on the shopping cart icon,
  So that I can easily know how many items I have added to my cart.

Scenario: Adding items to the cart
  Given I am on the product page
  When I add an item to the cart
  Then the number on the shopping cart icon should increase correspondingly

Scenario: Removing items from the cart
  Given I have items in my cart
  When I remove an item from the cart
  Then the number on the shopping cart icon should decrease correspondingly