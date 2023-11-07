import { REGEX_EMAIL, REGEX_CHARACTERS, VALIDATE_MESSAGE } from "../../constants/index";

const { INVALID_EMAIL, REQUIRED_ERROR, INVALID_PASSWORD, INVALID_CONFIRM_PASSWORD } = VALIDATE_MESSAGE;

const validateField = (value, fieldName, regex, errorMessage) =>
  !value ? REQUIRED_ERROR.replace('{field}', fieldName) : (!regex.test(value) ? errorMessage.replace('{field}', fieldName) : null);

export const validateEmailField = (email) => validateField(email, 'Email', REGEX_EMAIL, INVALID_EMAIL);
export const validatePasswordField = (password) => validateField(password, 'Password', REGEX_CHARACTERS, INVALID_PASSWORD);
export const validateConfirmPasswordField = (password, confirmPassword) => {
  if (!confirmPassword) {
    return REQUIRED_ERROR.replace('{field}', 'Confirm Password');
  } else if (password !== confirmPassword) {
    return INVALID_CONFIRM_PASSWORD;
  }
  return null;
};
