import '../../../src/index.css';
import EditUserProfileModal from '../../../src/components/Modals/EditUserProfileModal';

describe('EditUserProfileModal.cy.jsx', () => {
  beforeEach(() => {
    cy.login('hyperslap', '1234');
  });
  it('See if it´s possbile to update new username to old name', () => {
    const token = Cypress.env('token');
    const authorization = `Bearer ${token}`;
    console.log(authorization);

    cy.mount(<EditUserProfileModal cypress authorization={authorization} />);
    cy.get('#edit-user-username').type('hyperslap');
    cy.get('.edit-user-modal-save').click();
    cy.get('#edit-user-username-error').should('exist');
  });
});
