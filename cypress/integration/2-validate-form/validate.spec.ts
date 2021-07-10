const userInfo = {
  username: 'TestsSlayer',
  completeName: 'John Simpleman',
  age: 34,
  city: 'montreal',
  interests: [
    'coding',
    'climbing',
  ],
  transport: 'public-transport',
}
describe('example to-do app', () => {
  beforeEach(() => {
    cy.on('fail', (e) => {
      console.log(e.message);
      if (e.message.match(/Timed out retrying after [0-9]+ms: expected.*to (have value.*|be 'checked')/)) {
        console.log('Validation failed, as aspected');
      }
      else {
        throw e;
      }
    })
    cy.visit('http://localhost:8000')
  })

  it('validates a form', () => {
    cy.fillForm(userInfo);
    cy.validateForm(userInfo);
  });

  it('fails if a textfield is incorect', () => {
    const failedUserInfo = {...userInfo, username: 'Minion'};
    cy.fillForm(failedUserInfo);
    cy.validateForm(userInfo);
  });

  it('fails if a checkbox is incorect', () => {
    const failedUserInfo = {...userInfo, interests: ['cycling']};
    cy.fillForm(userInfo);
    cy.validateForm(failedUserInfo)
  });

  it('fails if a select is incorect', () => {
    const failedUserInfo = {...userInfo, city: 'toronto'};
    cy.fillForm(failedUserInfo);
    cy.validateForm(userInfo);
  });

  it('fails if a radio button is incorect', () => {
    const failedUserInfo = {...userInfo, transport: 'bike'};
    cy.fillForm(userInfo);
    cy.validateForm(failedUserInfo)
  });
});
