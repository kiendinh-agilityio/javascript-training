const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const getShortMonthName = (date) => {
  return months[date.getMonth()];
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
