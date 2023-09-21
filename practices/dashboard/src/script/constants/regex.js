export const REGEX_PATTERN = {
  CAMEL_CASE_SEPARATOR: /([a-z])([A-Z])/g
}

// Check email have @ symbol, a string precedes it and the following string needs to contain a period, followed by 2-3 characters.
export const REGEX_EMAIL = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  return emailRegex.test(email)
}

// check the character must match the phone number format. Example: 202-555-0192
export const REGEX_PHONE = (phone) => {
  const phoneRegex = /^\d{3,}-\d{3}-\d{4}$/
  return phoneRegex.test(phone)
}

// check characters with strings or numbers between 6 and 30 characters in length
export const REGEX_NAME = (firtName, lastName) => {
  const nameRegex = /[0-9a-zA-Z]{4,20}/
  return nameRegex.test(firtName, lastName)
}
