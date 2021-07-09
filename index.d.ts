type FormMapper = {
  [key: string]: FieldMap | undefined;
}

type FormValues = {
  [key: string]: string | undefined;
}

type FieldMap = {
  type: 'text' | 'select';
  selector: string;
  choiceSelectors?: ChoiceSelectors;
}

type ChoiceSelectors = {
  [key: string]: string
}

declare namespace Cypress {
  interface Chainable {
    fillForm(formMapper: FormMapper, formValues: FormValues): Chainable<void>;
  }
}
