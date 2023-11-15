// Check email have @ symbol, a string precedes it and the following string needs to contain a period, followed by 2-3 characters.
export const REGEX_EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// Check password
export const REGEX_CHARACTERS = /^.{8,}$/;

// Check regex for link
export const REGEX_LINK = /^www\.[\w-]+\.com$/i;

// Check the character must match the phone number format. Example: (205)-205-5555
export const REGEX_PHONE = /^\(\d{3}\)-\d{3}-\d{4}$/;

// Check characters with strings or numbers between 6 and 30 characters in length
export const REGEX_NETWORK = /[0-9a-zA-Z]{4,20}/;
