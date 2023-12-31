export const REGEX = {
  // Check email have @ symbol, a string precedes it and the following string needs to contain a period, followed by 2-3 characters.
  EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,

  // Check password
  CHARACTERS: /^.{8,}$/,

  // Check regex for link
  LINK: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\.[a-zA-Z]{2,})?([/?].*)?$/,

  // Check the character must match the phone number format. Example: (205)-205-5555
  PHONE: /^\(\d{3}\)-\d{3}-\d{4}$/,

  // Check characters with strings or numbers between 6 and 30 characters in length
  NETWORK: /[0-9a-zA-Z]{4,20}/,

  // Keyword
  KEYWORD: /\s/g,
};
