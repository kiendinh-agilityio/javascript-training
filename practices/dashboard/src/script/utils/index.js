export const checkFullNameMatch = (firstName, lastName, searchTerm) => {
  return (firstName + ' ' + lastName).toLowerCase().includes(searchTerm)
}
export const checkEmailMatch = (email, searchTerm) => {
  return email.toLowerCase().includes(searchTerm)
}

export const checkPhoneMatch = (phone, searchTerm) => {
  return phone.includes(searchTerm)
}
