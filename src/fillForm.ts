import EnvVariableProvider from "./helpers/EnvVariableProvider";
import { FieldType, getFieldType } from "./helpers/fieldTypeChecker";


Cypress.Commands.add("fillForm", (values: FormValues) => {
  cy.log('Filling form');
  Object.keys(values).forEach((key) => {
    const value = values[key];
    if (!value) {
      throw new Error(`Value not set for value to fill with key: '${key}'`);
    }
    getFieldType(key, value, (fieldType) => {
      switch(fieldType) {
        case FieldType.checkbox:
          (value as string[]).forEach(v => checkInput(key, v));
          break;
        case FieldType.radio:
          checkInput(key, value as string);
          break;
        case FieldType.text:
          fillTextField(key, value as string|number);
          break;
        case FieldType.select:
          fillSelectField(key, value as string|number);
          break;
      }
    });
  });
});

function checkInput(key: string, value: string | number) {
  cy.get(`[${EnvVariableProvider.handleAttribute}=${key}][value=${value}]`).check();
}

function fillTextField(key: string, value: string | number) {
  cy.get(`[${EnvVariableProvider.handleAttribute}=${key}]`).type(`${value}`);
}

function fillSelectField(key: string, value: string | number) {
  cy.get(`[${EnvVariableProvider.handleAttribute}=${key}]`)
    .select(`${value}`);
}
