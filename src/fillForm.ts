import EnvVariableProvider from "./helpers/EnvVariableProvider";
import { FieldType, getFieldType } from "./helpers/fieldTypeChecker";


Cypress.Commands.add("fillForm", (values: FormValues, fieldMappers?: FieldMappers) => {
  cy.log('Filling form');
  Object.keys(values).forEach((key) => {
    const value = values[key];
    if (!value) {
      throw new Error(`Value not set for value to fill with key: '${key}'`);
    }
    if (fieldMappers) {
      const fieldMapper = fieldMappers[key];
      if (fieldMapper) {
        fillFromMapper(fieldMapper, value);
        return;
      }
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

function fillFromMapper(fieldMapper: FieldMapper, value: string | number | string[]) {
  switch(fieldMapper.type) {
    case 'text':
      cy.get(fieldMapper.selector!).type(`${value}`);
      break;
    case 'select':
      if (!fieldMapper.choiceSelectors) {
        throw new Error("Choices to be selected are not set in fieldMap. Make sure you have set the 'choiceSelectors' field in the field map.")
      }
      cy.get(fieldMapper.selector!).click();
      cy.get(fieldMapper.choiceSelectors[value as string | number]).click();
      break;
    case 'checkbox':
      (value as string[]).forEach(v => cy.get(fieldMapper.choiceSelectors![v]).click());
      break;
    case 'radio':
      cy.get(fieldMapper.choiceSelectors![value as string]).click();
      break;
  }
}