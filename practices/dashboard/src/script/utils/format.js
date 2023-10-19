import { MONTHS } from '../constants/index';

// Format Phone Number
const formatPhoneNumber = (phoneNumber) => {
  if (phoneNumber.length >= 10) {
    return `(${phoneNumber.slice(0, 3)})-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  }

  return phoneNumber;
};

export const formatLimitedPhoneNumberInput = (event) => {
  const phoneNumber = event.target.value;
  const cleanPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');

  // Limit phone numbers to a maximum of 10 numbers
  if (cleanPhoneNumber.length > 10) {
    event.target.value = event.target.value.slice(0, -1);
  } else {
    event.target.value = formatPhoneNumber(cleanPhoneNumber);
  }
};

// Format date
const getShortMonthName = (date) => {
  return MONTHS[date.getMonth()];
};

const addDaySuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return day + 'th';
  }
  switch (day % 10) {
    case 1:
      return day + 'st';
    case 2:
      return day + 'nd';
    case 3:
      return day + 'rd';
    default:
      return day + 'th';
  }
};

const currentDate = new Date();
const day = addDaySuffix(currentDate.getDate());

export const formattedDate = `${getShortMonthName(currentDate)} ${day}, ${currentDate.getFullYear()}`;
