import {
  validateNameField,
  validateEmailField,
  validatePhoneField,
  validateRoleField,
} from './validations';

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
