type FormMapper = {
  [key: string]: FieldMap | undefined;
}

type FormValues = {
  [key: string]: string | undefined;
}

type FieldMap = {
  type: FieldType;
  selector: string;
  choiceSelectors?: ChoiceSelectors;
}

type ChoiceSelectors = {
  [key: string]: string
}

declare enum FieldType {
  text,
  radio,
  checkbox,
  select,
}

declare namespace Cypress {
  interface Chainable {
    fillForm(formMapper: FormMapper, formValues: FormValues): Chainable<void>;
  }
}
