import { VALIDATE_MESSAGE } from '../constants'
import {
  displayWarningName,
  displayWarningEmail,
  displayWarningPhone,
  requiredMessage
} from './validations'

const { REQUIRED_ERROR } = VALIDATE_MESSAGE

export const validateUserForm = (user) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    role
  } = user

  const errors = {}

  const firstNameError = requiredMessage(firstName, 'First Name *') || displayWarningName(firstName, 'First Name *')
  if (firstNameError) {
    errors.firstName = firstNameError
  }

  const lastNameError = requiredMessage(lastName, 'Last Name *') || displayWarningName(lastName, 'Last Name *')
  if (lastNameError) {
    errors.lastName = lastNameError
  }

  const emailError = requiredMessage(email, 'Email ID *') || displayWarningEmail(email)
  if (emailError) {
    errors.email = emailError
  }

  const phoneError = requiredMessage(phone, 'Mobile No *') || displayWarningPhone(phone)
  if (phoneError) {
    errors.phone = phoneError
  }

  if (!role) {
    errors.role = `${REQUIRED_ERROR.replace('{field}', 'Role Type')}`
  }

  return errors
}
