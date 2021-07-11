import EnvVariableProvider from "./helpers/EnvVariableProvider";
import { FieldType, getFieldType } from "./helpers/fieldTypeChecker";

Cypress.Commands.add("validateForm", (values: FormValues, fieldMappers?: FieldMappers) => {
  cy.log('Filling form');
  Object.keys(values).forEach((key) => {
    const value = values[key];
    if (!value) {
      throw new Error(`Value not set for value to fill with key: '${key}'`);
    }
    if (fieldMappers) {
      const fieldMapper = fieldMappers[key];
      if (fieldMapper) {
        validateFromMapper(fieldMapper, value);
        return;
      }
    }
    getFieldType(key, value, (fieldType) => {
      switch(fieldType) {
        case FieldType.checkbox:
          (value as string[]).forEach(v => validateCheck(key, v));
          break;
        case FieldType.radio:
          validateCheck(key, value as string);
          break;
        case FieldType.text:
          validateTextField(key, value as string|number);
          break;
        case FieldType.select:
          validateSelectField(key, value as string|number);
          break;
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

function validateFromMapper(fieldMapper: FieldMapper, value: string|number|string[]) {
  switch(fieldMapper.type) {
    case 'text':
      cy.get(fieldMapper.selector!).should('have.value', value);
      break;
    case 'select':
      cy.get(fieldMapper.selector!).contains(value as string | number);
      break;
    case 'checkbox':
      (value as string[]).forEach(v => cy.get(fieldMapper.choiceSelectors![v]).should('be.checked'));
      break;
    case 'radio':
      cy.get(fieldMapper.choiceSelectors![value as string]).should('be.checked')
      break;
  }
}