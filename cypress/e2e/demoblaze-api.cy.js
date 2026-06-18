describe('Demoblaze - Pruebas API Signup y Login', () => {
  const apiBaseUrl = 'https://api.demoblaze.com';
  const username = `qa_user_${Date.now()}_${Cypress._.random(1000, 9999)}`;
  const password = `Pass_${Date.now()}`;

  it('crea un usuario nuevo', () => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/signup`,
      body: {
        username,
        password
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.satisfy((body) => body === '' || Cypress._.isEmpty(body));
    });
  });

  it('intenta crear un usuario ya existente', () => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/signup`,
      failOnStatusCode: false,
      body: {
        username,
        password
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('errorMessage');
      expect(response.body.errorMessage).to.contain('This user already exist');
    });
  });

  it('realiza login con usuario y password correctos', () => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/login`,
      body: {
        username,
        password
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.a('string');
      expect(response.body).to.match(/^Auth_token: .+/);
    });
  });

  it('rechaza login con password incorrecto', () => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/login`,
      failOnStatusCode: false,
      body: {
        username,
        password: `${password}_incorrecto`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('errorMessage');
      expect(response.body.errorMessage).to.contain('Wrong password');
    });
  });
});
