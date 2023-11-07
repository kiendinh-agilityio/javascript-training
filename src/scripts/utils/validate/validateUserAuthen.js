import { validateEmailField, validatePasswordField, validateConfirmPasswordField } from './validations';

export const validateUserAuthen = (user) => {
  const { email, password, confirmPassword } = user;

  const errors = {};

  const emailError = validateEmailField(email);
  if (emailError) {
    errors.email = emailError;
  }

  const passwordError = validatePasswordField(password);
  if (passwordError) {
    errors.password = passwordError;
  }

  const confirmPasswordError = validateConfirmPasswordField(password, confirmPassword);
  if (confirmPasswordError) {
    errors.confirmPassword = confirmPasswordError;
  }

  return errors;
};
