import { createElement } from 'react';
import UserProducts from '../../../src/components/Products/UserProducts';
import Navbar from '../../../src/Navbar';
import { useShoppingCartItems } from '../../../src/zustand/customHooks';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import '../../../dist/index.css';

describe('UserProduct´s buttons', () => {
  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: 'http://185.112.144.228:8000/auth/login',
      body: {
        username: 'hyperslap',
        password: '1234',
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
  it('Test if added/removed products are reflected in the navbar', () => {
    const token = Cypress.env('token');
    const authorization = `bearer ${token}`;
    const options = {
      method: 'GET',
      url: `http:///185.112.144.228:8000/get-all-products`,
      headers: {
        Authorization: authorization,
      },
    };

    cy.request(options).then(response => {
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
