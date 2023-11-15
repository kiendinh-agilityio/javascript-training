import {
  validateEmailField,
  validateLinkField,
  validateNetworkField,
  validatePhoneField,
  validateStatusField,
} from './validations';

export const validateAdsForm = (adsItem) => {
  const { email = '', phone = '', status = '', network = '', link = '' } = adsItem || {};

  const errors = {};

  const emailError = validateEmailField(email);
  if (emailError) {
    errors.email = emailError;
  }

  const phoneError = validatePhoneField(phone);
  if (phoneError) {
    errors.phone = phoneError;
  }

  const statusError = validateStatusField(status);
  if (statusError) {
    errors.status = statusError;
  }

  const networkError = validateNetworkField(network);
  if (networkError) {
    errors.network = networkError;
  }

  const linkError = validateLinkField(link);
  if (linkError) {
    errors.link = linkError;
  }

  return errors;
};
