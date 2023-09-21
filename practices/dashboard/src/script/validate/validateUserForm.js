import { REGEX_EMAIL, REGEX_PHONE, REGEX_NAME, VALIDATE_MESSAGE } from '../constants'

const { inValidEmail, invalidPhone, inValidUsername, requiredError } = VALIDATE_MESSAGE

export const validateUserForm = (user) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    role
  } = user

  const errors = {}

  if (!firstName) {
    errors.firstName = `${requiredError.replace('{field}', 'First Name')}`
  } else if (!REGEX_NAME(firstName)) {
    errors.firstName = `${inValidUsername.replace('{field}', 'First Name')}`
  }

  if (!lastName) {
    errors.lastName = `${requiredError.replace('{field}', 'Last Name')}`
  } else if (!REGEX_NAME(lastName)) {
    errors.lastName = `${inValidUsername.replace('{field}', 'Last Name')}`
  }

  if (!email) {
    errors.email = `${requiredError.replace('{field}', 'Email')}`
  } else if (!REGEX_EMAIL(email)) {
    errors.email = `${inValidEmail}`
  }

  if (!phone) {
    errors.phone = `${requiredError.replace('{field}', 'Phone Number')}`
  } else if (!REGEX_PHONE(phone)) {
    errors.phone = `${invalidPhone}`
  }

  if (!role) {
    errors.role = `${requiredError.replace('{field}', 'Role Type')}`
  }

  return errors
}
