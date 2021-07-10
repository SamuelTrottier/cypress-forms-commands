Cypress.Commands.add("fillFormFromMap", (mapper: FormMapper, values: FormValues) => {
  cy.log('Filling form from map');
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
      fillTextField(fieldMap, value as string);
    }
    else if (fieldMap.type === 'select') {
      fillSelectField(fieldMap, value as string);
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