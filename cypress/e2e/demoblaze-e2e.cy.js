describe('Demoblaze - Flujo de compra E2E', () => {
  const products = ['Samsung galaxy s6', 'Nokia lumia 1520'];
  const buyer = {
    name: 'QA Automation',
    country: 'Colombia',
    city: 'Bogota',
    card: '4111111111111111',
    month: '12',
    year: '2030'
  };

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('agrega dos productos al carrito y completa la compra', () => {
    const alerts = [];

    cy.on('window:alert', (message) => {
      alerts.push(message);
      expect(message).to.contain('Product added');
    });

    cy.visit('/');
    cy.get('#tbodyid').should('be.visible');

    products.forEach((productName, index) => {
      addProductToCart(productName);
      cy.wrap(null).should(() => {
        expect(alerts, `alerta de producto agregado ${index + 1}`).to.have.length(index + 1);
      });
      cy.get('#nava').click();
      cy.get('#tbodyid').should('be.visible');
    });

    cy.get('#cartur').click();
    cy.url().should('include', 'cart.html');
    cy.get('#tbodyid').should('be.visible');

    products.forEach((productName) => {
      cy.contains('#tbodyid td', productName).should('be.visible');
    });

    cy.get('#totalp')
      .should('be.visible')
      .invoke('text')
      .then((totalText) => {
        expect(Number(totalText), 'total del carrito').to.be.greaterThan(0);
      });

    cy.contains('button', 'Place Order').click();
    cy.get('#orderModal').should('be.visible');
    cy.get('#name').type(buyer.name);
    cy.get('#country').type(buyer.country);
    cy.get('#city').type(buyer.city);
    cy.get('#card').type(buyer.card);
    cy.get('#month').type(buyer.month);
    cy.get('#year').type(buyer.year);
    cy.contains('#orderModal button', 'Purchase').click();

    cy.get('.sweet-alert').should('be.visible');
    cy.get('.sweet-alert h2').should('have.text', 'Thank you for your purchase!');
    cy.get('.sweet-alert p').within(() => {
      cy.contains('Id:').should('exist');
      cy.contains('Amount:').should('exist');
      cy.contains(`Card Number: ${buyer.card}`).should('exist');
    });
    cy.contains('.sweet-alert button.confirm', 'OK').should('be.visible').click();
    cy.get('.sweet-alert').should('not.be.visible');
    cy.contains('#orderModal button', 'Close').should('be.visible').click();
    cy.get('#orderModal').should('not.be.visible');

    cy.get('#nava').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/index.html`);
    cy.get('#tbodyid').should('be.visible');
  });

  function addProductToCart(productName) {
    cy.contains('.card-title a', productName).should('be.visible').click();
    cy.get('.name').should('have.text', productName);
    cy.contains('a', 'Add to cart').should('be.visible').click();
  }
});
