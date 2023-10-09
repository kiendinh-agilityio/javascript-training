import { REGEX_EMAIL, REGEX_PHONE, REGEX_NAME, VALIDATE_MESSAGE } from '../constants'

const { INVALID_EMAIL, INVALID_PHONE, INVALID_NAME, REQUIRED_ERROR } = VALIDATE_MESSAGE

export const displayWarningName = (name, fieldName) => {
  if (!REGEX_NAME.test(name)) {
    return `${INVALID_NAME.replace('{field}', fieldName)}`
  }
}

export const displayWarningEmail = (email) => {
  if (!REGEX_EMAIL.test(email)) {
    return INVALID_EMAIL
  }

  return null
}

export const displayWarningPhone = (phone) => {
  if (!REGEX_PHONE.test(phone)) {
    return INVALID_PHONE
  }

  return null
}

export const requiredMessage = (value, fieldName) => {
  if (!value) {
    return `${REQUIRED_ERROR.replace('{field}', fieldName)}`
  }

  return null
}
