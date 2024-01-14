// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react18';

Cypress.Commands.add('mount', mount);
// Example use:
// cy.mount(<MyComponent />)

Cypress.Commands.add('login', (username, password) => {
  cy.request({
    method: 'POST',
    url: 'http://185.112.144.228:8000/auth/login',
    body: {
      username,
      password,
    },
  })
    .as('loginResponse')
    .then(response => {
      Cypress.env('token', response.body.token); // either this or some global var but remember that this will only work in one test case
      return response;
    })
    .its('status')
    .should('eq', 200);
});

Cypress.Commands.add('authenticatedRequest', (method, url, token, body) => {
  const options = {
    method: method,
    url: url,
    headers: {
      Authorization: token,
    },
    body: JSON.stringify(body),
  };
});
