import { camelCaseToHyphenCase } from '../constants';

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
