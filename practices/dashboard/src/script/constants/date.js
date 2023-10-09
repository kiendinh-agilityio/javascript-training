const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const getShortMonthName = (date) => {
  return months[date.getMonth()]
}

const currentDate = new Date()

export const formattedDate = `${currentDate.getDate()} ${getShortMonthName(currentDate)}, ${currentDate.getFullYear()}`
