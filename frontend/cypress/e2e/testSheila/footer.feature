Feature: Footer content

Scenario: Display footer links
  Given I am on the home page
  Then I should see links to "About", "Shop", "Blog", "Contact Us", "Terms", and "Privacy" in the footer
  When I navigate in the aplication

Scenario: Display copyright information
  Given I am on Home page
  Then I should see the copyright information in the footer
