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
const currentDate = new Date();
const options = { month: 'short' };
const shortMonth = currentDate.toLocaleString('en-US', options);
const day = currentDate.getDate();

const addDaySuffix = (day) => {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const digit = day % 10;

  return `${day}${suffixes[digit] || 'th'}`;
};

const formattedDay = addDaySuffix(day);
const year = currentDate.getFullYear();

export const formattedDate = `${shortMonth} ${formattedDay}, ${year}`;
