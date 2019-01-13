describe('React Cube App', () => {
  it('should assert that <title> is correct', () => {
    cy.visit('http://localhost:3000');
    cy.title().should('include', 'React Cube App');
  });

  it('should be able to start', () => {
    cy.getByTestId('Login')
      .should('contain', 'Start')
      .click();
  });


  it('should be able to dismiss the alert', () => {
    cy.getByTestId('AlertWrapper').should('have.length', 1);
    cy.getByTestId('AlertButton').click();
    cy.wait(300)
      .queryByTestId('AlertWrapper')
      .should('not.exist');
  });

  it('should be able to logout', () => {
    cy.get('[class^=Logout]').click();
  });

  it('should have redirected to /', () => {
    cy.getByTestId('HomeWrapper').should('have.length', 1);
  });

  it('should be able to start again', () => {
    cy.getByTestId('Login')
      .should('contain', 'Start')
      .click();

    cy.getByTestId('PrivateWrapper').should('have.length', 1);
  });

  it('should be able to logout again', () => {
    cy.get('[class^=Logout]').click();

    cy.getByTestId('HomeWrapper').should('have.length', 1);
  });
});
