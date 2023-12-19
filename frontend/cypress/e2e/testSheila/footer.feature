Feature: Footer component

Scenario: Footer component should display copyright text
  Given I have a Footer component
  When I provide a copyright text "Copyright © 2023"
  Then the Footer component should display the copyright text
