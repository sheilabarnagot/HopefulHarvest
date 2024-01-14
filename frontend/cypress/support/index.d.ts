/// <reference types="cypress" />
// declare namespace Cypress {
//   interface Chainable<Subject> {
//     login(): Chainable<any>;
//   }
// }
declare namespace Cypress {
  interface Chainable<Subject> {
    login(username: string, password: string): void;
    // login(username: string, password: string): void;
    authenticatedRequest(
      method: string,
      url: string,
      token: string,
      body: any
    ): void;
    mount: unknown;
  }
}
