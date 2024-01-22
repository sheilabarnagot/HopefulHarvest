import UserProducts from '../../../src/components/Products/UserProducts';
import Navbar from '../../../src/Navbar';
import { useShoppingCartItems } from '../../../src/zustand/customHooks';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../support/index.d';
import '../../../dist/index.css';
import React from 'react';
describe('UserProduct´s buttons', () => {
  beforeEach(() => {
    cy.login('hyperslap', '1234');
  });
  it('Test if added/removed products are reflected in the navbar', () => {
    const token = Cypress.env('token');

    cy.authenticatedRequest(
      'get',
      `http:///185.112.144.228:8000/get-all-products`,
      token,
      undefined
    ).then(response => {
      console.log(response);
      cy.mount(
        <>
          <Router>
            <Navbar />
          </Router>

          {response.body.map(product => {
            return (
              <>
                <UserProducts
                  removeTest={useShoppingCartItems.getState().removeFromCart}
                  setTest={useShoppingCartItems.getState().updateShoppingCart}
                  product={product}
                />
              </>
            );
          })}
        </>
      );
      cy.get('#add-item-18').click().click();
      cy.get('#remove-item-18').click().click();
      cy.get('#add-item-17').click().click();
      cy.get('#remove-item-17').click().click();
    });
  });
});
