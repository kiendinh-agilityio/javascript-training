import { REGEX, VALIDATE_MESSAGES } from "../../constants/index";

const { INVALID_EMAIL, REQUIRED_ERROR, INVALID_PASSWORD, INVALID_CONFIRM_PASSWORD, INVALID_LINK, INVALID_PHONE, INVALID_NETWORK } = VALIDATE_MESSAGES;

const validateField = (value, fieldName, regex, errorMessage) =>
  !value ? REQUIRED_ERROR.replace('{field}', fieldName) : (!regex.test(value) ? errorMessage.replace('{field}', fieldName) : null);

export const validateEmailField = (email) => validateField(email, 'Email', REGEX.EMAIL, INVALID_EMAIL);
export const validatePasswordField = (password) => validateField(password, 'Password', REGEX.CHARACTERS, INVALID_PASSWORD);
export const validateConfirmPasswordField = (password, confirmPassword) => {
  if (!confirmPassword) {
    return REQUIRED_ERROR.replace('{field}', 'Confirm Password');
  } else if (password !== confirmPassword) {
    return INVALID_CONFIRM_PASSWORD;
  }
  return null;
};
export const validateNetworkField = (network) => validateField(network, 'Network', REGEX.NETWORK, INVALID_NETWORK);
export const validatePhoneField = (phone) => validateField(phone, 'Mobile No', REGEX.PHONE, INVALID_PHONE);
export const validateStatusField = (status) => !status ? REQUIRED_ERROR.replace('{field}', 'Status Type') : null;
export const validateLinkField = (link) => validateField(link, 'Link', REGEX.LINK, INVALID_LINK);
