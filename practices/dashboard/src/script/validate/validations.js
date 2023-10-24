import {
  REGEX_EMAIL,
  REGEX_PHONE,
  REGEX_NAME,
  VALIDATE_MESSAGE,
} from '../constants';

const { INVALID_EMAIL, INVALID_PHONE, INVALID_NAME, REQUIRED_ERROR } = VALIDATE_MESSAGE;

const validateField = (value, fieldName, regex, errorMessage) =>
  !value ? REQUIRED_ERROR.replace('{field}', fieldName) : (!regex.test(value) ? errorMessage.replace('{field}', fieldName) : null);

export const validateNameField = (name) => validateField(name, 'Name', REGEX_NAME, INVALID_NAME);

export const validateEmailField = (email) => validateField(email, 'Email', REGEX_EMAIL, INVALID_EMAIL);

export const validatePhoneField = (phone) => validateField(phone, 'Mobile No', REGEX_PHONE, INVALID_PHONE);

export const validateRoleField = (role) => !role ? REQUIRED_ERROR.replace('{field}', 'Role Type') : null;
