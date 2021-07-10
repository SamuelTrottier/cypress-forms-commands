Cypress.Commands.add("validateForm", (mapper: FormMapper, values: FormValues) => {
  cy.log('Filling form');
  Object.keys(values).forEach((key) => {
    const fieldMap = mapper[key];
    const value = values[key];
    if (!fieldMap) {
      throw new Error(`No field in mapper matches key: '${key}'`);
    }
    if (!value) {
      throw new Error(`Value not set for value to fill with key: '${key}'`);
    }
    if (fieldMap.type === 'text') {
      validateTextField(fieldMap, value);
    }
    else if (fieldMap.type === 'select') {
      validateSelectField(fieldMap, value);
    }
  });
});

function validateTextField(fieldMap: FieldMap, value: string) {
  cy.get(fieldMap.selector).should('have.value', value);
}

function validateSelectField(fieldMap: FieldMap, value: string) {
  cy.get
}