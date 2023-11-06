export const REGEX_PATTERN = {
  CAMEL_CASE_SEPARATOR: /([a-z])([A-Z])/g,
};

// Check email have @ symbol, a string precedes it and the following string needs to contain a period, followed by 2-3 characters.
export const REGEX_EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// Check password
export const REGEX_CHARACTERS = /^.{8,}$/;
