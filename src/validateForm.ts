import EnvVariableProvider from "./helpers/EnvVariableProvider";
import { FieldType, getFieldType } from "./helpers/fieldTypeChecker";

Cypress.Commands.add("validateForm", (values: FormValues) => {
  cy.log('Filling form');
  Object.keys(values).forEach((key) => {
    const value = values[key];
    if (!value) {
      throw new Error(`Value not set for value to fill with key: '${key}'`);
    }
    getFieldType(key, value, (fieldType) => {
      switch(fieldType) {
        case FieldType.checkbox:
          (value as string[]).forEach(v => validateCheck(key, v));
          break;
        case FieldType.radio:
          validateCheck(key, value as string);
        case FieldType.text:
          validateTextField(key, value as string|number);
        case FieldType.select:
          validateSelectField(key, value as string|number);
      }
    });
  });
});

function validateTextField(key: string, value: string|number) {
  cy.get(`[${EnvVariableProvider.handleAttribute}=${key}]`).should('have.value', value);
}

function validateSelectField(key: string, value: string|number) {
  cy.get(`[${EnvVariableProvider.handleAttribute}=${key}]`).should('have.value', value);
}

function validateCheck(key: string, value: string) {
  cy.get(`[${EnvVariableProvider.handleAttribute}=${key}][value=${value}]`).should('be.checked');
}