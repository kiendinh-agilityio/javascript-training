export const isFullNameMatch = (firstName, lastName, searchTerm) => {
  return (firstName + ' ' + lastName).toLowerCase().includes(searchTerm)
}

export const isEmailMatch = (email, searchTerm) => {
  return email.toLowerCase().includes(searchTerm)
}

export const isPhoneMatch = (phone, searchTerm) => {
  return phone.includes(searchTerm)
}
