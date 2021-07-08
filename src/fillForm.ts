Cypress.Commands.add("fillForm", (mapper: FormMapper, values: FormValues) => {
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
    if (fieldMap.type === FieldType.text) {
      fillTextField(fieldMap, value);
    }
    else if (fieldMap.type === FieldType.select) {
      fillTextField(fieldMap, value);
    }
  });
});

function fillTextField(fieldMap: FieldMap, value: string) {
  cy.get(fieldMap.selector).type(value);
}

function fillSelectField(fieldMap: FieldMap, value: string) {
  if (!fieldMap.choiceSelectors) {
    throw new Error("Choices to be selected are not set in fieldMap. Make sure you have set the 'choiceSelectors' field in the field map.")
  }
  cy.get(fieldMap.selector).click();
  cy.get(fieldMap.choiceSelectors[value]).click();
}