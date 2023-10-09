export const REGEX_PATTERN = {
  CAMEL_CASE_SEPARATOR: /([a-z])([A-Z])/g
}

// Check email have @ symbol, a string precedes it and the following string needs to contain a period, followed by 2-3 characters.

export const REGEX_EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

// check the character must match the phone number format. Example: 202-555-0192
export const REGEX_PHONE = /^\d{3,}\d{3}\d{4}$/

// check characters with strings or numbers between 6 and 30 characters in length
export const REGEX_NAME = /[0-9a-zA-Z]{4,20}/
