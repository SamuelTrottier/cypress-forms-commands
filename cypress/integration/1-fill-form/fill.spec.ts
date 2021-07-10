describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000')
  })

  it('Fills the form', () => {
    const userInfo = {
      username: 'TestsSlayer',
      completeName: 'John Simpleman',
      age: 34,
      city: 'Montreal',
      interests: [
        'coding',
        'climbing',
      ],
      transport: 'public-transport',
    }
    cy.fillForm(userInfo);
    cy.get('[cy-f=username]').should('have.value', userInfo.username);
    cy.get('[cy-f=completeName]').should('have.value', userInfo.completeName);
    cy.get('[cy-f=age]').should('have.value', userInfo.age);
    cy.get('[cy-f=city]').should('have.value', userInfo.city);
    cy.get('[cy-f=interests][value=coding]').should('be.checked');
    cy.get('[cy-f=interests][value=climbing]').should('be.checked');
    cy.get('[cy-f=interests][value=cycling]').should('not.be.checked');
    cy.get('[cy-f=interests][value=gaming]').should('not.be.checked');
    cy.get('[cy-f=transport][value=public-transport]').should('be.checked');
  });
});