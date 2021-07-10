import EnvVariableProvider from "./helpers/EnvVariableProvider";


Cypress.Commands.add("fillForm", (values: FormValues) => {
  cy.log('Filling form');
  Object.keys(values).forEach((key) => {
    const value = values[key];
    if (!value) {
      throw new Error(`Value not set for value to fill with key: '${key}'`);
    }
    if (Array.isArray(value)) {
      value.forEach(v => {
        checkInput(key, v);
      })
      return;
    }
    getFieldFromName(key, (e) => {
      if (e.tagName === 'INPUT') {
        if (e.getAttribute('type') === 'radio') {
          checkInput(key, value);
          return;
        }
        fillTextField(key, value);
      }
      else if (e.tagName === 'SELECT') {
        fillSelectField(key, value);
      }
    })
  });
});

function checkInput(key: string, value: string | number) {
  cy.get(`[${EnvVariableProvider.handleAttribute}=${key}][value=${value}]`).check();
}

function getFieldFromName(key: string, callback: (e: HTMLElement) => void) {
  return cy.get(`[${EnvVariableProvider.handleAttribute}=${key}]`)
    .then($el => {
      callback($el.get(0));
    })
}

function fillTextField(key: string, value: string | number) {
  cy.get(`[${EnvVariableProvider.handleAttribute}=${key}]`).type(`${value}`);
}

function fillSelectField(key: string, value: string | number) {
  cy.get(`[${EnvVariableProvider.handleAttribute}=${key}]`)
    .select(`${value}`);
}