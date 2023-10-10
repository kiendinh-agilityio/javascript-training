import { REGEX_PATTERN } from './regex';

export const camelCaseToHyphenCase = (input) =>
  input.replace(REGEX_PATTERN.CAMEL_CASE_SEPARATOR, '$1-$2').toLowerCase();
