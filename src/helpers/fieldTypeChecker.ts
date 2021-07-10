import EnvVariableProvider from "./EnvVariableProvider";

export function getFieldType(key: string, value: string|number|string[], callback: (fieldType: FieldType) => void) {
  if (Array.isArray(value)) {
    callback(FieldType.checkbox);
  }
  getFieldFromName(key, (e) => {
    if (e.tagName === 'INPUT') {
      if (e.getAttribute('type') === 'radio') {
        callback(FieldType.radio);
        return;
      }
      callback(FieldType.text);
    }
    else if (e.tagName === 'SELECT') {
      callback(FieldType.text);
    }
    throw new Error(`Could not determine field type from key: '${key}' and value: '${value}'.`);
  })
}

function getFieldFromName(key: string, callback: (e: HTMLElement) => void) {
  return cy.get(`[${EnvVariableProvider.handleAttribute}=${key}]`)
    .then($el => {
      callback($el.get(0));
    })
}

export enum FieldType {
  checkbox,
  radio,
  text,
  select,
}