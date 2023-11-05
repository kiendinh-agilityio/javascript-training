import { DISPLAY_CLASS } from '../constants/index';

export const toggleDropdown = (element) => {
  element.style.display = element.style.display === DISPLAY_CLASS.FLEX ? DISPLAY_CLASS.HIDDEN : DISPLAY_CLASS.FLEX;
};
