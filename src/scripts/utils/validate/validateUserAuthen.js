import { validateEmailField, validatePasswordField } from './validations';

export const validateUserAuthen = (user) => {
  const { email, password } = user;

  const errors = {};

  const emailError = validateEmailField(email);
  if (emailError) {
    errors.email = emailError;
  }

  const passwordError = validatePasswordField(password);
  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
};
