export default class EnvVariableProvider {
  static get handleAttribute() {
    return Cypress.env("formscommands_handle_attribute") || 'cy-f';
  }
}
