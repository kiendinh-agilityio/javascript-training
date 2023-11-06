import { REGEX_PATTERN } from '../../constants/index';

const camelCaseToHyphenCase = (input) =>
  input.replace(REGEX_PATTERN.CAMEL_CASE_SEPARATOR, '$1-$2').toLowerCase();

const updateErrorMessages = (errors) => {
  Object.entries(errors).forEach(([key, value]) => {
    const newKey = camelCaseToHyphenCase(key);
    const target = document.getElementById(`${newKey}-error`);
    if (target) {
      target.innerText = value;
    }
  });
};

export const showFormErrors = (errors) => {
  updateErrorMessages(errors);
};
