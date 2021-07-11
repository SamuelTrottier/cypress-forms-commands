type FieldMappers = {
  [key: string]: FieldMapper | undefined;
}

type FormValues = {
  [key: string]: string | number | string[] | undefined;
}

type FieldMapper = {
  type: 'text' | 'select' | 'checkbox' | 'radio';
  selector?: string;
  choiceSelectors?: ChoiceSelectors;
}

type ChoiceSelectors = {
  [key: string]: string
}

declare namespace Cypress {
  interface Chainable {
    /**
     * Fills a form with the specified values
     * @param {FormValues} formValues Values that will be used to fill the form
     * @param {FieldMappers?} fieldMappers Mapping for more complex fields
    */
    fillForm(formValues: FormValues, fieldMappers?: FieldMappers): Chainable<void>;
    /**
     * Validates that all the specified fields have the correct value
     * @param {FormValues} formValues Values that will be validated
     * @param {FieldMappers?} fieldMappers Mapping for more complex fields
    */
    validateForm(formValues: FormValues, fieldMappers?: FieldMappers): Chainable<void>;
  }
}
