// ***********************************************

// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

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
      Cypress.env('token', response.body.token);
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
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  };
  cy.request(options).as('authenticatedRequest');
});
