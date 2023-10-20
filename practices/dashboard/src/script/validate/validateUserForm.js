import { VALIDATE_MESSAGE } from '../constants';
import {
  displayWarningName,
  displayWarningEmail,
  displayWarningPhone,
  requiredMessage,
} from './validations';

const { REQUIRED_ERROR } = VALIDATE_MESSAGE;

const validateNameField = (value, fieldName) => {
  return (
    requiredMessage(value, fieldName) || displayWarningName(value, fieldName)
  );
};

const validateEmailField = (email) => {
  return requiredMessage(email, 'Email') || displayWarningEmail(email);
};

const validatePhoneField = (phone) => {
  return requiredMessage(phone, 'Mobile No') || displayWarningPhone(phone);
};

const validateRoleField = (role) => {
  if (!role) {
    return REQUIRED_ERROR.replace('{field}', 'Role Type');
  }

  return null;
};

export const validateUserForm = (user) => {
  const { firstName, lastName, email, phone, role } = user;

  const errors = {};

  const firstNameError = validateNameField(firstName, 'First Name');
  if (firstNameError) {
    errors.firstName = firstNameError;
  }

  const lastNameError = validateNameField(lastName, 'Last Name');
  if (lastNameError) {
    errors.lastName = lastNameError;
  }

  const emailError = validateEmailField(email);
  if (emailError) {
    errors.email = emailError;
  }

  const phoneError = validatePhoneField(phone);
  if (phoneError) {
    errors.phone = phoneError;
  }

  const roleError = validateRoleField(role);
  if (roleError) {
    errors.role = roleError;
  }

  return errors;
};
